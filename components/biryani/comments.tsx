"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, MessageSquarePlus } from "lucide-react"

type Comment = {
  id: string
  name: string
  rating: number
  text: string
  createdAt: number
}

function storageKey(spotId: string) {
  return `biriyani:comments:${spotId}`
}

export function Comments({ spotId }: { spotId: string }) {
  const [items, setItems] = useState<Comment[]>([])
  const [openForm, setOpenForm] = useState(false)

  // form state
  const [name, setName] = useState("")
  const [rating, setRating] = useState<number | "">("")
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(spotId))
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore parse errors
    }
  }, [spotId])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(spotId), JSON.stringify(items))
    } catch {
      // storage might be unavailable
    }
  }, [items, spotId])

  const avg = useMemo(() => {
    if (!items.length) return 0
    const sum = items.reduce((acc, c) => acc + c.rating, 0)
    return Math.round((sum / items.length) * 10) / 10
  }, [items])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError("Please enter your name.")
    if (rating === "" || rating < 1 || rating > 5) return setError("Please select a rating from 1–5.")
    if (!text.trim()) return setError("Please write a short comment.")
    const comment: Comment = {
      id: `${Date.now()}`,
      name: name.trim().slice(0, 40),
      rating: Number(rating),
      text: text.trim().slice(0, 400),
      createdAt: Date.now(),
    }
    setItems((prev) => [comment, ...prev].slice(0, 200))
    setName("")
    setRating("")
    setText("")
    setOpenForm(false)
  }

  const preview = items.slice(0, 3)

  return (
    <section aria-label="Comments">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length
            ? `${items.length} comment${items.length > 1 ? "s" : ""} • Avg ${avg.toFixed(1)}★`
            : "No comments yet"}
        </p>
        <Button size="sm" variant="outline" onClick={() => setOpenForm((v) => !v)}>
          <MessageSquarePlus className="mr-2 h-4 w-4" aria-hidden />
          {openForm ? "Cancel" : "Add comment"}
        </Button>
      </div>

      {openForm && (
        <form onSubmit={submit} className="mb-3 space-y-3 rounded-md border p-3">
          <div className="grid gap-2">
            <Label htmlFor={`name-${spotId}`}>Name</Label>
            <Input
              id={`name-${spotId}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={40}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Rate ${n} out of 5`}
                  onClick={() => setRating(n)}
                  className={`rounded border px-2 py-1 ${rating === n ? "bg-amber-600 text-white" : "bg-background"}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Star className={`h-4 w-4 ${rating === n ? "fill-current" : ""}`} aria-hidden /> {n}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`comment-${spotId}`}>Comment</Label>
            <Textarea
              id={`comment-${spotId}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us about the spice, aroma, or portion size..."
              maxLength={400}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">
              Post comment
            </Button>
          </div>
        </form>
      )}

      {items.length > 0 && (
        <ul className="space-y-2">
          {preview.map((c) => (
            <li key={c.id} className="rounded-md border bg-card p-3">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-sm font-medium">{c.name}</p>
                <span aria-label={`${c.rating} out of 5 stars`} className="text-sm text-amber-700">
                  {c.rating}★
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{c.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
          {items.length > 3 && (
            <li className="pt-1 text-right text-xs text-muted-foreground">
              Showing 3 of {items.length}. Add a comment to join the conversation!
            </li>
          )}
        </ul>
      )}
    </section>
  )
}
