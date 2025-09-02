import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CtaFooter() {
  return (
    <section aria-labelledby="cta-heading" className="border-t bg-amber-50">
      <div className="container mx-auto grid items-center gap-6 px-4 py-10 md:grid-cols-2 md:py-14">
        <div className="space-y-4">
          <h3 id="cta-heading" className="text-pretty text-2xl font-semibold text-foreground md:text-3xl">
            Ready when you are
          </h3>
          <p className="text-base leading-relaxed text-amber-900">
            Cravings don’t wait. Discover a top spot nearby and place your order with one tap.
          </p>
          <div className="flex items-center gap-3">
            <a href="#list">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600">
                Find my biryani
              </Button>
            </a>
            <a href="#list">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100 bg-transparent">
                Browse all spots
              </Button>
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted">
          <Image
            src={
              "/placeholder.svg?height=720&width=960&query=close%20shot%20of%20biryani%20with%20saffron%20and%20mint"
            }
            alt="Close shot of biryani with saffron strands and fresh mint"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
