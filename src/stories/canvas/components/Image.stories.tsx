import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Image, { ImageParameters } from '@/components/canvas/Image';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import utilities from '../../../../tailwind.utilities.json';

const colorKeys = Object.keys(theme.extend.colors || {});
const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));

const meta: Meta<typeof Image> = {
  title: 'Component Starter Kit/Components/Image',
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;
const argTypes: Partial<ArgTypes<ImageParameters>> = {
  objectFit: { control: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
  width: { control: { type: 'number', min: 0 } },
  height: { control: { type: 'number', min: 0 } },
  overlayColor: { control: 'select', options: colorKeys },
  overlayOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  border: { control: 'select', options: borderKeys },
};

export const Default: Story = {
  args: {
    objectFit: 'cover',
    width: 500,
    height: 500,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('image', undefined, {
      ...args,
      image: IMAGE_ASSET,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            image: Image,
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
