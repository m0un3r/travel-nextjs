import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Tours', href: '#tours', id: 'tours' },
  { label: 'Categories', href: '#categories', id: 'categories' },
  { label: 'About Us', href: '#about', id: 'about' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
];

export interface NavLinksProps {
  activeSection?: string;
  onLinkClick?: (href: string) => void;
  className?: string;
  linkClassName?: string;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  activeSection,
  onLinkClick,
  className = '',
  linkClassName = '',
}) => {
  const handleClick = (_e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onLinkClick) {
      onLinkClick(href);
    }
  };

  return (
    <nav className={`flex items-center gap-1 sm:gap-2 ${className}`}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id || activeSection === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`
              relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg select-none
              ${
                isActive
                  ? 'text-travelio-gold-400 font-semibold bg-white/10'
                  : 'text-zinc-200 hover:text-white hover:bg-white/5'
              }
              ${linkClassName}
            `.trim()}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-travelio-gold-400 rounded-full" />
            )}
          </a>
        );
      })}
    </nav>
  );
};

export default NavLinks;
