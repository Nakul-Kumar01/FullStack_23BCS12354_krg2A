import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const links = [
    { name: "Problems", to: "/problem", key: "problem" },
    { name: "Discuss", to: "/Discuss", key: "discuss" },
    { name: "Contest", to: "/Contest", key: "contest" },
    { name: "Game", to: "/contact", key: "game" },
    { name: "Interview", to: "/interview", key: "interview" },
  ];

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-evenly gap-6 px-8 py-3 rounded-bl-2xl rounded-br-2xl shadow-xl backdrop-blur-lg bg-[rgba(253,253,253,0)] border border-white/10">
        <div  >
          <svg width="100" height="40" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="loopGradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FE9A00" />
                <stop offset="1" stop-color="#FFD166" />
              </linearGradient>
            </defs>
            <path d="M20 40C20 20 50 20 70 40C90 60 120 60 140 40C160 20 180 20 180 40C180 60 150 60 130 40C110 20 80 20 60 40C40 60 20 60 20 40Z"
              stroke="url(#loopGradient)" stroke-width="6" fill="none" stroke-linecap="round" />
            <text x="35" y="65" fill="#FE9A00" font-size="28" font-family="Poppins, sans-serif" font-weight="bold">Nex</text>
            <text x="100" y="65" fill="#ffffff" font-size="28" font-family="Poppins, sans-serif" font-weight="bold">Loop</text>
          </svg>
        </div>
        {links.map((link) => {
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.key}
              to={link.to}
              className={`
              relative text-white font-medium text-lg transition-all duration-300
              ${isActive ? "text-yellow-600" : "hover:text-yellow-600"}
            `}
            >
              {link.name}
              {/* underline animation */}
              <span
                className={`
                absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-600 rounded-full 
                transition-all duration-300 
                ${isActive ? "w-full" : "group-hover:w-full"}
              `}
              />
            </Link>
          )
        })}
      </div>
    </div>
  );
}
