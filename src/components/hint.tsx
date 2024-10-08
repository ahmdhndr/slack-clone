'use client';
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

interface HintComponentProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const HintComponent = ({
  label,
  children,
  side,
  align,
}: HintComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className='bg-black text-bone-white border border-white/5'
        >
          <p className='font-medium text-xs'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HintComponent;
