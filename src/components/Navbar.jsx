import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const linkBase =
    "px-3 py-2 text-sm md:text-base font-medium border-b-2 transition-colors";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-30 bg-surface border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 text-accent"
              aria-hidden="true"
            >
              <g fill="currentColor">
                <path d="M16 4c-2.8 0-5 2.2-5 5 0 3 2.4 5 5 5s5-2 5-5c0-2.8-2.2-5-5-5z" />
                <path d="M16 18c-2.8 0-5 2.2-5 5 0 3 2.4 5 5 5s5-2 5-5c0-2.8-2.2-5-5-5z" />
                <path d="M4 16c0 2.8 2.2 5 5 5 3 0 5-2.4 5-5s-2-5-5-5c-2.8 0-5 2.2-5 5z" />
                <path d="M18 16c0 2.8 2.2 5 5 5 3 0 5-2.4 5-5s-2-5-5-5c-2.8 0-5 2.2-5 5z" />
              </g>
            </svg>
          </div>
          <span className="font-display text-lg md:text-xl text-cream">
            FlowerFestAnalytics
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-accent border-accent"
                  : "text-muted border-transparent hover:text-cream"
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/topics"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-accent border-accent"
                  : "text-muted border-transparent hover:text-cream"
              }`
            }
          >
            Topics
          </NavLink>
          <NavLink
            to="/trends"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-accent border-accent"
                  : "text-muted border-transparent hover:text-cream"
              }`
            }
          >
            Trends
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

