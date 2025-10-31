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
        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4 ${subtitleClassName}`}>
          {subtitle}
        </div>
      )}
      
      <h2 className={`text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4 ${titleClassName}`}>
        {title}
      </h2>
      
      {description && (
        <p className={`text-secondary-600 dark:text-secondary-400 max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        } ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
