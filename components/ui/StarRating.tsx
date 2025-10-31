// components/ui/StarRating.tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showRating?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showRating = false,
  showCount = false,
  count = 0,
  className = ''
}: StarRatingProps) {
  const sizeMap = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSize = sizeMap[size];
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => {
          // Full star
          if (i < Math.floor(rating)) {
            return (
              <Star
                key={i}
                className={`${iconSize} text-yellow-400 fill-yellow-400 mr-0.5`}
              />
            );
          }
          
          // Partial star (if rating has decimal)
          if (i === Math.floor(rating) && !Number.isInteger(rating)) {
            const percent = Math.round((rating - Math.floor(rating)) * 100);
            return (
              <span key={i} className="relative mr-0.5">
                {/* Background star (empty) */}
                <Star className={`${iconSize} text-secondary-300 dark:text-secondary-700`} />
                
                {/* Foreground star (filled) with width based on rating decimal */}
                <div 
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${percent}%` }}
                >
                  <Star className={`${iconSize} text-yellow-400 fill-yellow-400`} />
                </div>
              </span>
            );
          }
          
          // Empty star
          return (
            <Star
              key={i}
              className={`${iconSize} text-secondary-300 dark:text-secondary-700 mr-0.5`}
            />
          );
        })}
      </div>
      
      {showRating && (
        <span className="ml-1.5 font-medium text-secondary-900 dark:text-white">
          {rating.toFixed(1)}
        </span>
      )}
      
      {showCount && count > 0 && (
        <span className="ml-1 text-secondary-500 dark:text-secondary-400 text-sm">
          ({count > 999 ? `${(count / 1000).toFixed(1)}k` : count})
        </span>
      )}
    </div>
  );
}
