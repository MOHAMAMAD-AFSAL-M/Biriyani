"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export type Filters = {
  search: string
  spice: "Any" | "Mild" | "Medium" | "Hot"
  minRating: number
  price: "Any" | "$" | "$$" | "$$$"
  vegOnly: boolean
  sortBy: "Distance" | "Rating" | "Price"
}

export function FiltersBar({
  value,
  onChange,
  onUseLocation,
}: {
  value: Filters
  onChange: (next: Filters) => void
  onUseLocation: () => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4" role="region" aria-label="Filters">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search spots, tags, or areas"
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Spice</Label>
          <Select value={value.spice} onValueChange={(v: Filters["spice"]) => onChange({ ...value, spice: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Any spice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Mild">Mild</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hot">Hot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Price</Label>
          <Select value={value.price} onValueChange={(v: Filters["price"]) => onChange({ ...value, price: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="$">$</SelectItem>
              <SelectItem value="$$">$$</SelectItem>
              <SelectItem value="$$$">$$$</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm">Min rating</Label>
          <Select value={String(value.minRating)} onValueChange={(v) => onChange({ ...value, minRating: Number(v) })}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {r}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="veg"
            checked={value.vegOnly}
            onCheckedChange={(checked) => onChange({ ...value, vegOnly: Boolean(checked) })}
          />
          <Label htmlFor="veg" className="text-sm">
            Veg-friendly only
          </Label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Label className="text-sm">Sort by</Label>
          <Select value={value.sortBy} onValueChange={(v: Filters["sortBy"]) => onChange({ ...value, sortBy: v })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Distance">Distance</SelectItem>
              <SelectItem value="Rating">Rating</SelectItem>
              <SelectItem value="Price">Price</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={onUseLocation} className="bg-amber-600 text-white hover:bg-amber-700">
            Use my location
          </Button>
        </div>
      </div>
    </div>
  )
}
