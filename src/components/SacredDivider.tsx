interface SacredDividerProps {
  motif?: 'olive' | 'cross';
  className?: string;
}

export function SacredDivider({ motif = 'olive', className = '' }: SacredDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-[#E8E4DD]" />
      {motif === 'cross' ? (
        <svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#A38048] shrink-0"
        >
          <path d="M9 1.5V20.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M3.5 7.5H14.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          width="32"
          height="18"
          viewBox="0 0 32 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#A38048] shrink-0"
        >
          <path
            d="M3 13C9 12.5 22 8.5 29 4"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M10 11.2C8.5 8.5 9.5 5.8 12.5 5.2C13 7.8 12 10.2 10 11.2Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 8.6C16.8 5.6 18.2 3.2 21.2 3C21.3 5.7 19.9 7.8 17.5 8.6Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 10C16.8 11.5 17.6 14 15.6 15.8C13.8 14.5 13.5 12 14.5 10Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M23 6.4C25.4 7.3 26.6 9.6 25 11.7C23 10.9 22.3 8.6 23 6.4Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="h-px flex-1 bg-[#E8E4DD]" />
    </div>
  );
}
