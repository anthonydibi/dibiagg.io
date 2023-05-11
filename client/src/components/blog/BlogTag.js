import { Tag, TagLeftIcon, TagLabel, useColorModeValue } from '@chakra-ui/react'
import { MdSchool, MdComputer } from 'react-icons/md'
import { SiNextDotJs } from 'react-icons/si'
import { GrTree } from 'react-icons/gr'

const TagConfig = {
  tutorial: {
    icon: MdSchool,
    color: 'lightgreen',
  },
  'coding stuff': {
    icon: MdComputer,
    color: 'blue.400',
  },
  next: {
    icon: SiNextDotJs,
    color: 'gray.800',
  },
  dsa: {
    icon: GrTree,
    color: 'cyan.200',
  },
}

function BlogTag(props) {
  return (
    <Tag
      size={'lg'}
      marginInlineStart={'0 !important'}
      borderRadius={'46px'}
      background={useColorModeValue('#f0f0f0', 'dark')}
      boxShadow={useColorModeValue(
        '5px 5px 10px #b2b2b2, -5px -5px 10px #ffffff',
        '5px 5px 9px #0f0f0f,-5px -5px 9px #313131',
      )}
      {...TagConfig[props.label]['props']}
    >
      <TagLeftIcon boxSize={'20px'} as={TagConfig[props.label]['icon']} />
      <TagLabel>{props.label}</TagLabel>
    </Tag>
  )
}

export default BlogTag
