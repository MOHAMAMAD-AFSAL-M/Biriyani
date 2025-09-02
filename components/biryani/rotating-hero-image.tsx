"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RotatingHeroImageProps = {
  images: { src: string; alt: string }[]
  intervalMs?: number
  className?: string
}

export function RotatingHeroImage({ images, intervalMs = 10000, className }: RotatingHeroImageProps) {
  const [index, setIndex] = React.useState(0)
  const [prevIndex, setPrevIndex] = React.useState(0)
  const total = images.length

  React.useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => {
      setPrevIndex((i) => (i + 1) % total)
      setIndex((i) => (i + 1) % total)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, total])

  const current = images[index]
  const previous = images[prevIndex]

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted",
        "isolate", // ensure proper stacking context
        className,
      )}
      aria-live="polite"
    >
      {/* Previous image fades out */}
      <img
        key={`${previous?.src}-prev`}
        src={previous?.src || "/placeholder.svg?height=720&width=960&query=biryani%20in%20handi"}
        alt={previous?.alt || "Biryani"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-opacity duration-700 ease-out",
          prevIndex !== index ? "opacity-0" : "opacity-100",
        )}
        loading="eager"
        decoding="async"
      />
      {/* Current image fades in */}
      <img
        key={`${current?.src}-curr`}
        src={current?.src || "/placeholder.svg?height=720&width=960&query=biryani%20in%20handi"}
        alt={current?.alt || "Biryani"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-opacity duration-700 ease-out",
          "opacity-100",
        )}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
