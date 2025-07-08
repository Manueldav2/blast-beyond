import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  details: string[]
  className?: string
}

export default function ServiceCard({ icon, title, description, details, className }: ServiceCardProps) {
  return (
    <Card className={`flex flex-col overflow-hidden ${className || ''}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary">{icon}</div>
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="grid gap-2 text-sm">
          {details.map((detail, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
