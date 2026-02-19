"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Florida gallery items
const galleryItems = {
  "interior": [
    {
      id: "int1",
      src: "/images/fl/detailing-1.jpg",
      alt: "Audi Q7 Interior Detail",
      caption: "Audi Q7 Interior",
    },
    {
      id: "int2",
      src: "/images/fl/detailing-2.jpg",
      alt: "Audi Q7 Rear Seats",
      caption: "Audi Q7 Rear Seats",
    },
    {
      id: "int3",
      src: "/images/fl/detailing-4.jpg",
      alt: "2014 Tahoe Interior Detail",
      caption: "2014 Tahoe Interior",
    },
    {
      id: "int4",
      src: "/images/fl/detailing-5.jpg",
      alt: "2004 Cadillac DeVille Interior Restoration",
      caption: "Cadillac DeVille Restoration",
    },
  ],
  "exterior": [
    {
      id: "ext1",
      src: "/images/fl/detailing-3.jpg",
      alt: "Ceramic Coated Honda Passport",
      caption: "Ceramic Coated Honda Passport",
    },
  ],
}

export default function GalleryFL() {
  const [category, setCategory] = useState("interior")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="interior" onValueChange={setCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="interior">Interior Detail</TabsTrigger>
          <TabsTrigger value="exterior">Exterior Detail</TabsTrigger>
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
