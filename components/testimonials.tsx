"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: "1",
    quote: "They cleaned my whole driveway and walkway. It looks brand new!",
    author: "KP, Bentonville",
  },
  {
    id: "2",
    quote: "Aiden and Ini helped me clean out my garage before I moved. Great guys!",
    author: "Ms. T, Rogers",
  },
  {
    id: "3",
    quote: "My patio hadn't been cleaned in years. Now it looks amazing! Very professional service.",
    author: "John D., Fayetteville",
  },
  {
    id: "4",
    quote: "Prompt, courteous, and did an excellent job with my yard cleanup. Will hire again!",
    author: "Sarah M., Springdale",
  },
]

export default function Testimonials() {
  return (
    <Tabs defaultValue="1" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {testimonials.map((testimonial) => (
          <TabsTrigger key={testimonial.id} value={testimonial.id}>
            {testimonial.id}
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
