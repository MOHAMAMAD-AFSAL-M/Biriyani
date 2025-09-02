"use client"

import { useCallback, useMemo, useState } from "react"
import { type Filters, FiltersBar } from "./filters"
import { SpotCard, type Spot } from "./spot-card"
import { spots as baseSpots } from "./spots-data"
import { haversineKm } from "./utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, LocateFixed } from "lucide-react"

export function SpotsList() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  const [filters, setFilters] = useState<Filters>({
    search: "",
    spice: "Any",
    minRating: 0,
    price: "Any",
    vegOnly: false,
    sortBy: "Distance",
  })

  const handleUseLocation = useCallback(() => {
    setLocationError(null)
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported in this browser.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      (err) => {
        setLocationError(err.message || "Unable to access your location.")
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    )
  }, [])

  const spotsWithDistance = useMemo<Spot[]>(() => {
    return baseSpots.map((s) => {
      const d = coords ? haversineKm(coords.lat, coords.lon, s.lat, s.lon) : undefined
      return { ...s, distanceKm: d }
    })
  }, [coords])

  const filtered = useMemo(() => {
    return spotsWithDistance
      .filter((s) => (filters.spice === "Any" ? true : s.spice === filters.spice))
      .filter((s) => s.rating >= filters.minRating)
      .filter((s) => (filters.price === "Any" ? true : s.priceLevel === filters.price))
      .filter((s) => (filters.vegOnly ? s.isVegFriendly : true))
      .filter((s) => {
        const q = filters.search.trim().toLowerCase()
        if (!q) return true
        return (
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        )
      })
      .sort((a, b) => {
        if (filters.sortBy === "Rating") return b.rating - a.rating
        if (filters.sortBy === "Price") return priceValue(a.priceLevel) - priceValue(b.priceLevel)
        // Distance default: undefined distances go to end
        const da = a.distanceKm ?? Number.POSITIVE_INFINITY
        const db = b.distanceKm ?? Number.POSITIVE_INFINITY
        return da - db
      })
  }, [filters, spotsWithDistance])

  return (
    <div id="list" className="space-y-6">
      <FiltersBar value={filters} onChange={setFilters} onUseLocation={handleUseLocation} />

      {!coords && (
        <Alert className="border-amber-600">
          <LocateFixed className="h-4 w-4" aria-hidden />
          <AlertTitle>Get accurate distances</AlertTitle>
          <AlertDescription>
            Tap “Use my location” to sort spots by how close they are to you. We only use your location on your device.
          </AlertDescription>
        </Alert>
      )}

      {locationError && (
        <Alert variant="destructive">
          <MapPin className="h-4 w-4" aria-hidden />
          <AlertTitle>Location error</AlertTitle>
          <AlertDescription>{locationError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  )
}

function priceValue(p: Spot["priceLevel"]) {
  if (p === "$") return 1
  if (p === "$$") return 2
  return 3
}
