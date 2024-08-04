import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiNextDotJs,
  SiNodeDotJs,
  SiReact,
  SiTypescript,
  SiCsharp,
  SiPostgresql,
} from 'react-icons/si';
import Remix from '../icons/Remix';
import { SkillDef } from './types';

export const skills: SkillDef[] = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Next.js', icon: SiNextDotJs },
  { name: 'Remix', icon: Remix },
  { name: 'Node.js', icon: SiNodeDotJs },
  { name: 'C#', icon: SiCsharp },
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss3 },
];
