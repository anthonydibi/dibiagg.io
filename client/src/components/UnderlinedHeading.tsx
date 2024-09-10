import { Heading, Box, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface UnderlinedHeadingProps extends PropsWithChildren {
  containerProps?: BoxProps;
  size?: string;
  fontColor?: string;
  underlineColor?: string;
}

export const UnderlinedHeading: FC<UnderlinedHeadingProps> = ({
  children,
  containerProps = {},
  size = '2xl',
  fontColor,
  underlineColor = 'accent',
}) => {
  return (
    <Box width={'fit-content'} {...containerProps}>
      <Heading display={'inline-block'} size={size} color={fontColor}>
        {children}
      </Heading>
      <Box
        position={'relative'}
        bottom={'8%'}
        left={'-4%'}
        width={'118%'}
        height={'20%'}
        backgroundColor={underlineColor}
      ></Box>
    </Box>
  );
};
