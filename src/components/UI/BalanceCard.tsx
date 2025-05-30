import { ReactNode } from "react";
import { getBackgroundByLogoName, getBankColor } from "@/lib/banksUtils";

interface BalanceCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  type: string;
  bank?: string;
  metallic?: boolean;
  className?: string;
}

export function BalanceCard({
  icon,
  title,
  value,
  type,
  bank = '',
  metallic = false,
  className = ''
}: BalanceCardProps) {

  const backgroundStyle = getBackgroundByLogoName(bank, metallic);
  const textColor = metallic ? "text-white" : "text-black";
  const bankColor = getBankColor(bank);

  return (
    <div
      className={`rounded-2xl p-4 shadow-lg transition-all duration-300 ${backgroundStyle} ${textColor} ${className} ${metallic ? '' : 'border-[2px] border-border'}`}
      style={metallic ? {
        boxShadow: `0 4px 20px -2px ${bankColor}40`,
        border: `1px solid ${bankColor}20`
      } : {}}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm opacity-80">{title}</h3>
        <div className="w-6 h-6 filter brightness-0 invert">
          {icon}
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      <p className="text-xs opacity-80 mt-1">{type}</p>
    </div>
  );
}