import { useState } from 'react';
import { Film } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function MediaImage({ src, alt, className = '', fallbackTitle }: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#232329] via-[#18181C] to-[#111113] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Film className="h-7 w-7 text-[#FDBE11]/70 mb-2" aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-xs font-medium text-[#D4D4D8] line-clamp-2 max-w-[14ch]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
