import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  featured?: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  buttonVariant = "default",
  featured = false,
  onSelect
}: PricingCardProps) {
  return (
    <div className={`pricing-card ${featured ? "featured" : ""}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="mt-4 mb-6">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <ul className="space-y-3 text-sm text-muted-foreground mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          onClick={onSelect}
          variant={buttonVariant}
          className="w-full h-12"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
