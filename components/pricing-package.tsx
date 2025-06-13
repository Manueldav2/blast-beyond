import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface PricingPackageProps {
  title: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

export default function PricingPackage({
  title,
  price,
  description,
  features,
  highlighted = false,
}: PricingPackageProps) {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-old_rose-500 shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {price && <div className="mt-4 text-4xl font-bold">{price}</div>}
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="grid gap-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-old_rose-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={highlighted ? "default" : "outline"} asChild>
          <a href="#quote">Get Started</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
