import { ContainerParameters } from '@/components/canvas/Container';
import { TextParameters } from '@/components/canvas/Text';
import { ArgTypes } from '@storybook/react';
import theme from '../../../tailwind.config.theme.json';
import utilities from '../../../tailwind.utilities.json';

const colorKeys = Object.keys(theme.extend.colors || {});
const fontKeys = Object.keys(theme.extend.fontFamily || {});
const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));

export const ContainerArgTypes: Partial<ArgTypes<ContainerParameters>> = {
  displayName: { control: 'text' },
  border: { control: 'select', options: borderKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  fluidContent: { control: 'boolean' },
  fullHeight: { control: 'boolean' },
};

export const TextArgTypes: Partial<ArgTypes<TextParameters>> = {
  text: { control: 'text' },
  tag: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] },
  size: { control: 'select', options: ['base', 'xl', '2xl', '4xl', '5xl', '7xl'] },
  weight: { control: 'select', options: ['normal', 'medium', 'bold', 'extrabold'] },
  color: { control: 'select', options: colorKeys },
  font: { control: 'select', options: fontKeys },
  letterSpacing: { control: 'select', options: ['normal', 'tighter', 'tight', 'wide', 'wider', 'widest'] },
  alignment: { control: 'select', options: ['left', 'center', 'right'] },
  decoration: { control: 'select', options: ['underline', 'overline', 'line-through', 'no-underline'] },
  transform: { control: 'select', options: ['uppercase', 'lowercase', 'capitalize', 'normal-case'] },
  lineCountRestrictions: { control: 'select', options: ['1', '2', '3', '4', '5', '6', 'none'] },
};
