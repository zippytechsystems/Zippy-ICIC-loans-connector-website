import React from 'react';
import {
  Wallet,
  Home,
  Briefcase,
  Building2,
  Car,
  Hammer,
  Paintbrush,
  GraduationCap,
  Tv,
  ArrowLeftRight,
  TrendingUp,
  HeartPulse,
  CircleDollarSign
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface LoanIconProps extends LucideProps {
  name: string;
}

export const LoanIcon: React.FC<LoanIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Wallet':
      return <Wallet {...props} />;
    case 'Home':
      return <Home {...props} />;
    case 'Briefcase':
      return <Briefcase {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Hammer':
      return <Hammer {...props} />;
    case 'Paintbrush':
      return <Paintbrush {...props} />;
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Tv':
      return <Tv {...props} />;
    case 'ArrowLeftRight':
      return <ArrowLeftRight {...props} />;
    case 'TrendingUp':
      return <TrendingUp {...props} />;
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    default:
      return <CircleDollarSign {...props} />;
  }
};
