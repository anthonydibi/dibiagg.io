import { Link } from '@chakra-ui/next-js';
import { FC, PropsWithChildren } from 'react';

interface NavLinkProps extends PropsWithChildren {
  href: string;
  onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ href, onClick, children }) => (
  <Link
    href={href}
    onClick={onClick}
    fontWeight={'bold'}
    border="1px solid transparent"
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
      border: '1px solid',
    }}
  >
    {children}
  </Link>
);

export default NavLink;
