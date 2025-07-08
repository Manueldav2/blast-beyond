"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)
      
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

      // Show success message
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
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Your full name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="Your email address" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" placeholder="Your address or neighborhood" required />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder="Tell us about your project and what services you need..." 
          rows={10}
          required 
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Free Quote"}
      </Button>
    </form>
  )
}
