"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample gallery categories and images
const galleryItems = {
  "pressure-washing": [
    {
      id: "pw1",
      src: "/driveway_clean.webp",
      alt: "Before and after of pressure washed driveway",
      caption: "Driveway transformation",
    },
    {
      id: "pw2",
      src: "/driveway2.jpg",
      alt: "Driveway cleaning",
      caption: "Driveway cleaning",
    },
    {
      id: "pw3",
      src: "/driveway3.webp",
      alt: "Driveway pressure washing",
      caption: "Driveway pressure washing",
    },
    {
      id: "pw4",
      src: "/sidewalk_clean.jpg",
      alt: "Sidewalk cleaning",
      caption: "Sidewalk cleaning",
    },
  ],
  cleanouts: [
    {
      id: "co1",
      src: "/garage_clean_out.jpg",
      alt: "Before and after garage cleanout",
      caption: "Garage organization",
    },
    {
      id: "co2",
      src: "/junk_cleanout.jpeg",
      alt: "Junk removal from garage",
      caption: "Junk removal",
    },
    {
      id: "co3",
      src: "/junk_removal2.jpg",
      alt: "Junk removal",
      caption: "Junk removal",
    },
  ],
  "yard-work": [
    {
      id: "yw1",
      src: "/yard_cleanup.jpg",
      alt: "Yard cleanup before and after",
      caption: "Yard cleanup",
    },
    {
      id: "yw2",
      src: "/weed_removal.webp",
      alt: "Weed removal and landscaping",
      caption: "Weed removal",
    },
    {
      id: "yw3",
      src: "/fence.webp",
      alt: "Fence cleaning",
      caption: "Fence cleaning",
    },
    {
      id: "yw4",
      src: "/side_patio_clean.jpeg",
      alt: "Side patio cleaning",
      caption: "Side patio cleaning",
    },
  ],
}

export default function Gallery() {
  const [category, setCategory] = useState("pressure-washing")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pressure-washing" onValueChange={setCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pressure-washing">Pressure Washing</TabsTrigger>
          <TabsTrigger value="cleanouts">Cleanouts</TabsTrigger>
          <TabsTrigger value="yard-work">Yard Work</TabsTrigger>
        </TabsList>

        {Object.entries(galleryItems).map(([key, images]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="p-2 text-center text-sm">{image.caption}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
