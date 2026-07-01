interface GradientBorderButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GradientBorderButton({ children, href, onClick, className = '' }: GradientBorderButtonProps) {
  const inner = (
    <>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gray-950 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium text-gray-50 backdrop-blur-3xl uppercase tracking-widest">
        {children}
      </span>
    </>
  );

  const baseClass = `relative inline-flex overflow-hidden rounded-full p-[1px] hover:scale-105 transition-transform duration-300 ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {inner}
    </button>
  );
}
