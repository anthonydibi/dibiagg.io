import { BiNews } from 'react-icons/bi';
import { BsPhone } from 'react-icons/bs';
import { GrTree } from 'react-icons/gr';
import { MdSchool } from 'react-icons/md';
import { SiNextDotJs } from 'react-icons/si';
import { VscFileBinary } from 'react-icons/vsc';
import { TagConfigType } from './types';

export const TagConfig: TagConfigType = {
  tutorial: {
    icon: MdSchool,
    color: '#90ee90',
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
