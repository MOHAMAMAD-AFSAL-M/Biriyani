import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { RotatingHeroImage } from "@/components/biryani/rotating-hero-image"

export function Hero() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-end px-4 py-3">
        <ModeToggle />
      </div>

      <div className="container mx-auto grid items-center gap-6 px-4 py-10 md:grid-cols-2 md:py-14">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            <Flame className="h-4 w-4" aria-hidden />
            <span className="text-sm font-medium">biriyani • Handpicked favorites</span>
          </div>
          <h1 className="text-pretty font-sans text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Find the best biryani near you
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From slow-cooked dum to Hyderabadi heat, explore top spots around you. Filter by spice, rating, and
            price—then order in a tap.
          </p>
          <div className="flex items-center gap-3">
            <a href="#list" className="inline-block">
              <Button className="bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-600">
                Explore spots
              </Button>
            </a>
            <a href="#list" className="inline-block">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
                I’m hungry now
              </Button>
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted">
          <RotatingHeroImage
            className="animate-fade-in"
            intervalMs={10000}
            images={[
              { src: "/images/hero-biryani-1.png", alt: "Dum biryani served in a copper handi with fresh herbs" },
              { src: "/images/hero-biryani-2.png", alt: "Hyderabadi biryani with caramelized onions and boiled egg" },
              { src: "/images/hero-biryani-3.png", alt: "Kolkata biryani with potato and subtle saffron aroma" },
              { src: "/images/hero-biryani-4.png", alt: "Spicy Andhra biryani with green chilies and mint" },
            ]}
          />
        </div>
      </div>
    </header>
  )
}
