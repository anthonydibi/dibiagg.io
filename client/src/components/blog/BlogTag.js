import { Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import { MdSchool, MdComputer } from 'react-icons/md'
import { SiNextDotJs } from 'react-icons/si'
import { GrTree } from 'react-icons/gr'

const TagConfig = {
  tutorial: {
    icon: MdSchool,
    color: 'lightgreen',
    props: {
      textColor: 'black',
    },
  },
  'coding stuff': {
    icon: MdComputer,
    color: 'blue.400',
    props: {
      textColor: 'black',
    },
  },
  next: {
    icon: SiNextDotJs,
    color: 'gray.800',
    props: {
      textColor: 'white',
    },
  },
  dsa: {
    icon: GrTree,
    color: 'cyan.200',
    props: {
      textColor: 'black',
    },
  },
}

function BlogTag(props) {
  return (
    <Tag
      size={'lg'}
      marginInlineStart={'0 !important'}
      background={TagConfig[props.label]['color'] || 'accent'}
      {...TagConfig[props.label]['props']}
    >
      <TagLeftIcon boxSize={'20px'} as={TagConfig[props.label]['icon']} />
      <TagLabel>{props.label}</TagLabel>
    </Tag>
  )
}

export default BlogTag
