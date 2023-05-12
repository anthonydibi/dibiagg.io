import {
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'
import { MdSchool, MdComputer } from 'react-icons/md'
import { SiNextDotJs } from 'react-icons/si'
import { GrTree } from 'react-icons/gr'

const TagConfig = {
  tutorial: {
    icon: MdSchool,
    color: 'lightgreen',
    fontColor: 'black',
    iconColor: 'black',
  },
  'coding stuff': {
    icon: MdComputer,
    color: 'blue.400',
    fontColor: 'black',
    iconColor: 'black',
  },
  next: {
    icon: SiNextDotJs,
    color: 'gray.800',
    fontColor: 'white',
    iconColor: 'white',
  },
  dsa: {
    icon: GrTree,
    color: 'cyan.200',
    fontColor: 'black',
    iconColor: 'black',
  },
}

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
        p={'0.35rem'}
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
  )
}

export default BlogTag
