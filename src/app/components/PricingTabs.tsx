import { CustomTabs , CustomTabsList , CustomTabsTrigger } from "./ui/CustomTabs";

interface PricingTabsProps {
  onTabChange: (tier: string) => void;
}

export function PricingTabs({ onTabChange }: PricingTabsProps) {
  return (
    <CustomTabs defaultValue="standard" className="w-full" onValueChange={onTabChange}>
      <CustomTabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
        <CustomTabsTrigger value="standard" className="text-sm md:text-base">
          Standard
        </CustomTabsTrigger>
        <CustomTabsTrigger value="premium" className="text-sm md:text-base">
          Premium
        </CustomTabsTrigger>
      </CustomTabsList>
    </CustomTabs>
  );
}