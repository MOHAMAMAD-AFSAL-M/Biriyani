"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star, MapPin, ExternalLink } from "lucide-react"
import { Comments } from "./comments"

export type Spot = {
  id: string
  name: string
  imageSrc?: string
  imageQuery: string
  rating: number
  spice: "Mild" | "Medium" | "Hot"
  priceLevel: "$" | "$$" | "$$$"
  isVegFriendly: boolean
  tags: string[]
  lat: number
  lon: number
  address: string
  url?: string
  distanceKm?: number
}

export function SpotCard({ spot }: { spot: Spot }) {
  const badgeColor =
    spot.spice === "Hot"
      ? "bg-red-600 text-white"
      : spot.spice === "Medium"
        ? "bg-amber-600 text-white"
        : "bg-emerald-600 text-white"

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name} ${spot.address}`)}&query_place_id=`
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg will-change-transform animate-fade-in-up">
      <div className="relative h-40 w-full bg-muted sm:h-48">
        <Image
          src={spot.imageSrc || `/placeholder.svg?height=600&width=800&query=${spot.imageQuery}`}
          alt={`Biryani at ${spot.name}`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{spot.name}</h3>
            <p className="text-sm text-muted-foreground">{spot.address}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-amber-800">
            <Star className="h-4 w-4 fill-current" aria-hidden />
            <span className="text-sm font-medium">{spot.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={badgeColor}>{spot.spice}</Badge>
          <Badge variant="outline">{spot.priceLevel}</Badge>
          {spot.isVegFriendly && (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              Veg-friendly
            </Badge>
          )}
          {spot.distanceKm != null && (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              {spot.distanceKm.toFixed(1)} km away
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
              Open in Maps
            </Button>
          </a>
          {spot.url && (
            <a href={spot.url} target="_blank" rel="noreferrer">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                Order now <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </a>
          )}
        </div>

        <div className="border-t pt-3">
          <Comments spotId={spot.id} />
        </div>
      </CardContent>
    </Card>
  )
}
