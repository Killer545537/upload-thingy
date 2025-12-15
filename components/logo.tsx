import type React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const Logo = ({ className, ...props }: LogoProps) => {
    return (
        <svg
            className={`w-[1em] h-[1em] ${className}`}
            fill='none'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            {/* The "Bento Blocks"
        - Light Mode: fill-black
        - Dark Mode: fill-white
      */}
            <rect
                className='fill-black dark:fill-white transition-colors'
                height='40'
                rx='2'
                width='16'
                x='12'
                y='12'
            />
            <rect
                className='fill-black dark:fill-white transition-colors'
                height='40'
                rx='2'
                width='16'
                x='36'
                y='12'
            />
            <rect
                className='fill-black dark:fill-white transition-colors'
                height='16'
                rx='2'
                width='40'
                x='12'
                y='36'
            />

            {/* The "Grid Lines" (The gaps)
        - Light Mode: stroke-white
        - Dark Mode: stroke-black
        This ensures the gaps are always visible against the background
      */}
            <path
                className='stroke-white dark:stroke-black transition-colors'
                d='M28 12V52'
                strokeWidth='4'
            />
            <path
                className='stroke-white dark:stroke-black transition-colors'
                d='M12 36H52'
                strokeWidth='4'
            />
        </svg>
    );
};
