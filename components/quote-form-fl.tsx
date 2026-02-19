"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function QuoteFormFL() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)
      
      // Handle checkboxes specifically if needed, but FormData usually captures checked ones
      
      const response = await fetch("https://formspree.io/f/xdkzraae", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({
        title: "Quote request submitted!",
        description: "We'll get back to you as soon as possible.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
      form.reset()
      
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      action="https://formspree.io/f/xdkzraae"
      method="POST"
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" placeholder="you@email.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city_zip">City / ZIP *</Label>
          <Input id="city_zip" name="city_zip" placeholder="Tallahassee, 32301" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="vehicle_model">Vehicle Make & Model *</Label>
          <Input id="vehicle_model" name="vehicle_model" placeholder="2020 Honda Accord" required />
        </div>
        
        <div className="grid gap-2">
          <Label>Services Interested In *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="service-interior" name="service-interior" value="Interior Detail" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-interior"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Interior Detail
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="service-exterior" name="service-exterior" value="Exterior Detail" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-exterior"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exterior Detail
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="service-student" name="service-student" value="Student Discount" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-student"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Student Discount
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="service-standard" name="service-standard" value="Standard Full Detail" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-standard"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Standard Full Detail
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="service-premium" name="service-premium" value="Premium Detail" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-premium"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Premium Detail
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="service-ceramic" name="service-ceramic" value="Ceramic Coating" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-ceramic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ceramic Coating
                </label>
              </div>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="service-maintenance" name="service-maintenance" value="Maintenance Plan" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="service-maintenance"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Maintenance Plan
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="photos">Upload Photos (Optional)</Label>
        <Input id="photos" name="photos" type="file" multiple accept="image/*,video/*" />
        <p className="text-xs text-muted-foreground">Supports photos and videos - helps us provide an accurate estimate</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Additional Notes</Label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder="Any specific concerns, stains, or requests..." 
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Get Your Estimate"}
      </Button>
    </form>
  )
}
