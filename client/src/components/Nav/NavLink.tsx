import { Link, LinkProps } from '@chakra-ui/next-js';
import { FC, PropsWithChildren } from 'react';

export interface NavLinkProps extends PropsWithChildren, LinkProps {
  display: string;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  onClick,
  children,
  ...restProps
}) => (
  <Link
    {...restProps}
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
