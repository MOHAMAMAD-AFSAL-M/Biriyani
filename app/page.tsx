import type { Metadata } from "next"
import { Hero } from "@/components/biryani/hero"
import { SpotsList } from "@/components/biryani/spots-list"
import { CtaFooter } from "@/components/biryani/cta-footer"

export const metadata: Metadata = {
  title: "Best Biryani Near You",
  description:
    "Discover the most mouthwatering biryani spots around you. Filter by spice, rating, and more—then order in a tap.",
}

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background">
      {/* Header/Hero */}
      <Hero />

      {/* Listing */}
      <section aria-labelledby="spots-heading" className="container mx-auto px-4 py-8 md:py-10">
        <h2 id="spots-heading" className="sr-only">
          Best biryani spots near you
        </h2>
        <SpotsList />
      </section>

      {/* CTA Footer */}
      <CtaFooter />
    </main>
  )
}
