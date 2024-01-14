import {
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { MdSchool } from 'react-icons/md';
import { SiNextDotJs } from 'react-icons/si';
import { GrTree } from 'react-icons/gr';
import { VscFileBinary } from 'react-icons/vsc';
import { BsPhone } from 'react-icons/bs';
import { BiNews } from 'react-icons/bi';

const TagConfig = {
  tutorial: {
    icon: MdSchool,
    color: '#90ee90',
    fontColor: 'black',
    iconColor: 'black',
  },
  'coding-stuff': {
    icon: VscFileBinary,
    color: '#4299e1',
    fontColor: 'black',
    iconColor: 'black',
  },
  next: {
    icon: SiNextDotJs,
    color: '#1A202C',
    fontColor: 'white',
    iconColor: 'white',
  },
  dsa: {
    icon: GrTree,
    color: '#9DECF9',
    fontColor: 'black',
    iconColor: 'black',
  },
  dsa: {
    icon: GrTree,
    color: '#9DECF9',
    fontColor: 'black',
    iconColor: 'black',
  },
  'ui-ux': {
    icon: BsPhone,
    color: '#FEB2B2',
    fontColor: 'black',
    iconColor: 'black',
  },
  opinion: {
    icon: BiNews,
    color: '#FAF089',
    fontColor: 'black',
    iconColor: 'black',
  },
};

const lightShadow = (baseColor) => {
  const floorMultiply = (n) => {
    return Math.floor(Math.min(parseInt(n, 16) * 0.85, 255)).toString(16);
  };
  const r = baseColor.substring(1, 3);
  const g = baseColor.substring(3, 5);
  const b = baseColor.substring(5, 7);
  return `#${floorMultiply(r)}${floorMultiply(g)}${floorMultiply(b)}`;
};

const darkShadow = (baseColor) => {
  const floorMultiply = (n) => {
    return Math.floor(Math.min(parseInt(n, 16) * 1.15, 255)).toString(16);
  };
  const r = baseColor.substring(1, 3);
  const g = baseColor.substring(3, 5);
  const b = baseColor.substring(5, 7);
  return `#${floorMultiply(r)}${floorMultiply(g)}${floorMultiply(b)}`;
};

function BlogTag(props) {
  return (
    <Box
      borderRadius={'46px'}
      p={'0.25rem'}
      background={useColorModeValue('#f0f0f0', 'dark')}
      boxShadow={useColorModeValue(
        ' 5px 5px 8px #b2b2b2, -5px -5px 8px #ffffff',
        ' 5px 5px 5px #0f0f0f, -5px -5px 5px #313131',
      )}
      marginInlineStart={'0 !important'}
    >
      <Box
        p={'.2rem'}
        borderRadius={'46px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          'inset 5px 5px 10px #b2b2b2, inset -5px -5px 10px #ffffff',
          'inset 5px 5px 9px #0f0f0f, inset -5px -5px 9px #313131',
        )}
      >
        <Tag
          bg={TagConfig[props.label]['color']}
          borderRadius={'46px'}
          size={'lg'}
          boxShadow={`inset 5px 5px 8px ${lightShadow(
            TagConfig[props.label]['color'],
          )}, inset -5px -5px 8px ${darkShadow(
            TagConfig[props.label]['color'],
          )}`}
          {...TagConfig[props.label].props}
        >
          <TagLeftIcon
            color={TagConfig[props.label].iconColor}
            boxSize={'20px'}
            as={TagConfig[props.label]['icon']}
          />
          <TagLabel color={TagConfig[props.label].fontColor}>
            {props.label}
          </TagLabel>
        </Tag>
      </Box>
    </Box>
  );
}

export default BlogTag;
