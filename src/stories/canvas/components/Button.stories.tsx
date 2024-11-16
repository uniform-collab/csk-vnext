import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Button, { ButtonParameters } from '@/components/canvas/Button';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { ContainerArgTypes, TextArgTypes } from '../../argTypes';
import { SMILE_ASSET } from '../../assets';

const colorKeys = Object.keys(theme.extend.colors || {});
const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('button'));

const meta: Meta<typeof Button> = {
  title: 'Component Starter Kit/Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const argTypes: Partial<ArgTypes<ButtonParameters>> = {
  text: { control: 'text' },
  buttonColor: { control: 'select', options: colorKeys },
  hoverButtonColor: { control: 'select', options: colorKeys },
  textColor: TextArgTypes.color,
  hoverTextColor: TextArgTypes.color,
  textWeight: TextArgTypes.weight,
  textTransform: TextArgTypes.transform,
  textFont: TextArgTypes.font,
  border: ContainerArgTypes.border,
  textSize: TextArgTypes.size,
  size: { control: 'select', options: sizeKeys },
  iconPosition: { control: 'select', options: ['left', 'right'] },
};
export const Default: Story = {
  args: {
    text: 'Button',
    link: { type: 'url', path: '/' },
    textColor: 'text-secondary',
    textTransform: 'normal-case',
    textWeight: 'medium',
    buttonColor: 'button-primary',
    hoverButtonColor: 'button-secondary',
    size: sizeKeys[0],
    textSize: 'base',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('button', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            button: Button,
          };
          return {
            component: mapper[component?.type] || DefaultNotImplementedComponent,
          };
        }}
        mode="server"
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Button',
    link: { type: 'url', path: '/' },
    textColor: 'text-secondary',
    textTransform: 'normal-case',
    textWeight: 'medium',
    buttonColor: 'button-primary',
    hoverButtonColor: 'button-secondary',
    iconPosition: 'left',
    size: sizeKeys[0],
    textSize: 'base',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('button', undefined, {
      ...args,
      icon: SMILE_ASSET,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            button: Button,
          };
          return {
            component: mapper[component?.type] || DefaultNotImplementedComponent,
          };
        }}
        mode="server"
      />
    );
  },
};
