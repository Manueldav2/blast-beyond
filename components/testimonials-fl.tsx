"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: "1",
    quote: "Add your first testimonial here! Have customers fill out the form below.",
    author: "Your Customer Name",
  },
]

export default function TestimonialsFL() {
  return (
    <Tabs defaultValue="1" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        {testimonials.map((testimonial) => (
          <TabsTrigger key={testimonial.id} value={testimonial.id}>
            Premium Detail
          </TabsTrigger>
        ))}
      </TabsList>
      {testimonials.map((testimonial) => (
        <TabsContent key={testimonial.id} value={testimonial.id}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Quote className="h-8 w-8 text-primary" />
                <p className="text-xl italic">"{testimonial.quote}"</p>
                <p className="font-medium">— {testimonial.author}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
