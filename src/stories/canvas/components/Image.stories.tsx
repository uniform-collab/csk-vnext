import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Image from '@/components/canvas/Image';
import { ImageArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Image> = {
  title: 'Component Starter Kit/Components/Image',
  component: Image,
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    objectFit: 'cover',
    width: 500,
    height: 500,
  },
  argTypes: ImageArgTypes,
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
