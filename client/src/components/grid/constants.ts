import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
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
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Remix', icon: Remix },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'C#', icon: SiCsharp },
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS', icon: SiCss3 },
];
