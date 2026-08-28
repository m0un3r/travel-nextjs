import React from 'react';
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';

export interface SocialLinkItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export const socialLinksData: SocialLinkItem[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://instagram.com/travelio.luxury',
    icon: <Instagram className="w-4 h-4" />,
    ariaLabel: 'Follow Travelio on Instagram',
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    href: 'https://x.com/travelio_luxury',
    icon: <Twitter className="w-4 h-4" />,
    ariaLabel: 'Follow Travelio on Twitter / X',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://facebook.com/travelio.luxury',
    icon: <Facebook className="w-4 h-4" />,
    ariaLabel: 'Follow Travelio on Facebook',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://youtube.com/@travelioluxury',
    icon: <Youtube className="w-4 h-4" />,
    ariaLabel: 'Subscribe to Travelio on YouTube',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/travelio-luxury',
    icon: <Linkedin className="w-4 h-4" />,
    ariaLabel: 'Connect with Travelio on LinkedIn',
  },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  iconClassName = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Social media channels"
    >
      {socialLinksData.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className={`
            w-9 h-9 rounded-xl bg-white/5 hover:bg-travelio-gold-500/20 text-zinc-400 hover:text-travelio-gold-400
            border border-white/10 hover:border-travelio-gold-500/40 flex items-center justify-center
            transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-travelio-gold-500/40
            ${iconClassName}
          `}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
