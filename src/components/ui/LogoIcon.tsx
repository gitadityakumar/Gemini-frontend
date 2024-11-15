import Link from "next/link";

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="w-32  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" className="w-full h-auto">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <rect width="200" height="60" fill="none"/>
                <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="url(#gradient)">Means</text>
                <path d="M185 10 L190 15 L185 20" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                <path d="M180 10 L185 15 L180 20" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
      </svg>
      </div>
    </Link>
  );
};
