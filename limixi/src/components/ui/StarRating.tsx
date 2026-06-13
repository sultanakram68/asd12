'use client';

import { getStarArray } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, size = 'md', showValue = true, reviewCount }: StarRatingProps) {
  const stars = getStarArray(rating);
  const sizeClasses = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex gap-0.5 ${sizeClasses[size]}`}>
        {stars.map((star, i) => (
          <span key={i} className={star === 'full' ? 'text-amber-400' : star === 'half' ? 'text-amber-400/50' : 'text-white/15'}>
            ★
          </span>
        ))}
      </div>
      {showValue && <span className="text-sm font-bold text-white/70">{rating}</span>}
      {reviewCount !== undefined && (
        <span className="text-xs text-white/40">({reviewCount})</span>
      )}
    </div>
  );
}
