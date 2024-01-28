import { NavLinkProps } from './NavLink';

export const NavLeftLinks: NavLinkProps[] = [
  { display: 'ABOUT', href: '/' },
  { display: 'GRAFFITI', href: '/graffiti' },
  { display: 'THREESHARP', href: '/threesharp' },
];

export const NavRightLinks: NavLinkProps[] = [
  { display: 'BLOG', href: '/blog' },
  {
    display: 'RESUME',
    href: '/Anthony Di Biaggio Resume.pdf',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export const DeathballLinks: NavLinkProps[] = [
  { display: 'ABOUT', href: '/deathball/about' },
  { display: 'PLAY', href: 'https://gilded-kulfi-c5ad94.netlify.app/' },
  { display: 'LEADERBOARD', href: '/deathball/leaderboard' },
];
