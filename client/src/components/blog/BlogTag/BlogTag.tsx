import {
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Box,
  Flex,
} from '@chakra-ui/react';
import { TagConfig } from './constants';
import { TagKeys } from './types';
import { lightShadow, darkShadow } from './util';

export interface BlogTagProps {
  tagConfigKey: TagKeys;
}

const BlogTag: React.FC<BlogTagProps> = ({ tagConfigKey }) => {
  const tag = TagConfig[tagConfigKey as TagKeys];
  const background = useColorModeValue('#f0f0f0', 'dark');
  const boxShadow = useColorModeValue(
    ' 5px 5px 5px #b2b2b2, -5px -5px 5px #ffffff',
    ' 4px 4px 4px #0f0f0f, -4px -4px 4px #313131',
  );
  const insetBoxShadow = useColorModeValue(
    'inset 5px 5px 10px #b2b2b2, inset -5px -5px 10px #ffffff',
    'inset 5px 5px 9px #0f0f0f, inset -5px -5px 9px #313131',
  );

  if (!tag) {
    return null;
  }

  const { icon, color, fontColor, iconColor } = tag;

  return (
    <Box
      borderRadius={'32px'}
      p={'0.25rem'}
      background={background}
      boxShadow={boxShadow}
      marginInlineStart={'0 !important'}
    >
      <Flex
        p={'.1rem'}
        borderRadius={'32px'}
        background={background}
        boxShadow={insetBoxShadow}
        align="center"
        justify="center"
      >
        <Tag
          bg={color}
          borderRadius={'32px'}
          size={'sm'}
          boxShadow={`inset 5px 5px 8px ${lightShadow(
            color,
          )}, inset -5px -5px 8px ${darkShadow(color)}`}
        >
          <TagLeftIcon color={iconColor} boxSize={'12px'} as={icon} />
          <TagLabel color={fontColor}>{tagConfigKey}</TagLabel>
        </Tag>
      </Flex>
    </Box>
  );
};

export default BlogTag;
