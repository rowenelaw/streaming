interface UWatchLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function UWatchLogo({ size = 'md' }: UWatchLogoProps) {
  const iconDims =
    size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-8 w-8' : 'h-7 w-7';
  const textSize =
    size === 'sm'
      ? 'text-xl'
      : size === 'lg'
        ? 'text-3xl'
        : 'text-2xl';

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconDims} shrink-0`}
      >
        <rect width="32" height="32" rx="8" fill="#FF5E00" />
        <path
          d="M12.5 10.2C12.5 9.55 13.21 9.15 13.77 9.48L22.52 14.78C23.06 15.11 23.06 15.89 22.52 16.22L13.77 21.52C13.21 21.85 12.5 21.45 12.5 20.8V10.2Z"
          fill="#111113"
        />
      </svg>
      <span
        className={`font-display ${textSize} font-extrabold tracking-tight text-[#FF5E00] leading-none`}
      >
        UWatch
      </span>
    </span>
  );
}
