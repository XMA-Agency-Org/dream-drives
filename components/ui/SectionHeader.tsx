// components/ui/SectionHeader.tsx
import { ReactNode } from 'react';

interface SectionHeaderProps {
  subtitle?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionHeader({ 
  subtitle, 
  title,
  description,
  align = 'center',
  className = "",
  subtitleClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) {
  // Alignment classes
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  return (
    <div className={`flex flex-col ${alignClasses[align]} mb-12 ${className}`}>
      {subtitle && (
        <div className={`subtitle mb-4 ${subtitleClassName}`}>
          {subtitle}
        </div>
      )}
      
      <h2 className={`title-section mb-4 ${titleClassName}`}>
        {title}
      </h2>
      
      {description && (
        <p className={`text-body text-muted max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        } ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
