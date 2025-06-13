"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you as soon as possible.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })

      // Reset form
      const form = event.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address (or neighborhood)</Label>
          <Input id="address" placeholder="Your address or neighborhood" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Your phone number" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" placeholder="Your email address" />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Services Requested</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="pressure-washing" />
            <Label htmlFor="pressure-washing" className="font-normal">
              Pressure Washing
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="garage-cleanout" />
            <Label htmlFor="garage-cleanout" className="font-normal">
              Garage Cleanout
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="yard-work" />
            <Label htmlFor="yard-work" className="font-normal">
              Yard Work
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hauling" />
            <Label htmlFor="hauling" className="font-normal">
              Hauling
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="other" />
            <Label htmlFor="other" className="font-normal">
              Other
            </Label>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes (for any custom needs)</Label>
        <Textarea id="notes" placeholder="Tell us more about what you need..." />
      </div>

      <div className="space-y-4">
        <Label>Preferred Contact Method</Label>
        <RadioGroup defaultValue="call">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="call" id="call" />
            <Label htmlFor="call" className="font-normal">
              Call
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text" className="font-normal">
              Text
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email-contact" />
            <Label htmlFor="email-contact" className="font-normal">
              Email
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Free Quote"}
      </Button>
    </form>
  )
}
