import { IconType } from 'react-icons/lib';

export type TagConfigType = { [K in TagKeys]: Tag };

export interface Tag {
  icon: IconType;
  color: string;
  fontColor: string;
  iconColor: string;
}

export enum TagKeys {
  tutorial = 'tutorial',
  'coding-stuff' = 'coding-stuff',
  next = 'next',
  dsa = 'dsa',
  'ui-ux' = 'ui-ux',
  opinion = 'opinion',
}
