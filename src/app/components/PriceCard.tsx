
import { CustomButton } from "./ui/CustomButton";
import { CustomCard , CustomCardHeader , CustomCardContent , CustomCardFooter } from "./ui/CustomCard";
import { Package, CreditCard, FileCheck, Star } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: number;
  features: string[];
  credits: number;
  tier: string;
  type: "builder" | "dealer";
}

export function PriceCard({ title, price, features, credits, tier, type }: PriceCardProps) {
  return (
    <CustomCard className={`w-full max-w-sm transition-all duration-300 hover:shadow-lg ${
      type === "dealer" ? "border-[#FF5D00]" : ""
    }`}>
      <CustomCardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {tier === "premium" ? (
            <Star className="w-12 h-12 text-[#FFD700]" fill="#FFD700" />
          ) : type === "builder" ? (
            <Package className="w-12 h-12 text-[#FF5D00]" />
          ) : (
            <CreditCard className="w-12 h-12 text-[#FF5D00]" />
          )}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-4xl font-bold mt-4">
          ₹{price}
          <span className="text-sm font-normal text-muted-foreground">/mo</span>
        </p>
      </CustomCardHeader>
      <CustomCardContent className="mt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#FF5D00] font-semibold">
            <CreditCard className="w-5 h-5" />
            {credits} Credits Included
          </div>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#FF5D00]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CustomCardContent>
      <CustomCardFooter>
        <CustomButton className="w-full">
          Inquire Now
        </CustomButton>
      </CustomCardFooter>
    </CustomCard>
  );
}
