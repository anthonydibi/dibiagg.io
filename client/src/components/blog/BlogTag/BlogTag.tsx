import {
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Box,
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
    ' 5px 5px 8px #b2b2b2, -5px -5px 8px #ffffff',
    ' 5px 5px 5px #0f0f0f, -5px -5px 5px #313131',
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
      borderRadius={'46px'}
      p={'0.25rem'}
      background={background}
      boxShadow={boxShadow}
      marginInlineStart={'0 !important'}
    >
      <Box
        p={'.2rem'}
        borderRadius={'46px'}
        background={background}
        boxShadow={insetBoxShadow}
      >
        <Tag
          bg={color}
          borderRadius={'46px'}
          size={'lg'}
          boxShadow={`inset 5px 5px 8px ${lightShadow(
            color,
          )}, inset -5px -5px 8px ${darkShadow(color)}`}
        >
          <TagLeftIcon color={iconColor} boxSize={'20px'} as={icon} />
          <TagLabel color={fontColor}>{tagConfigKey}</TagLabel>
        </Tag>
      </Box>
    </Box>
  );
};

export default BlogTag;
