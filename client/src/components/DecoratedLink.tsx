import { FC, PropsWithChildren } from "react";
import { Link as ChakraNextLink } from '@chakra-ui/next-js';
import { Text } from "@chakra-ui/react";

interface DecoratedLinkProps extends PropsWithChildren {
    href: string;
}

const DecoratedLink: FC<DecoratedLinkProps> = ({ href, children }) => {
    return (
        <Text
            as={ChakraNextLink}
            decoration={'underline'}
            href={href}
            color={'accent'}
        >
            {children}
        </Text>
    )
}

export default DecoratedLink