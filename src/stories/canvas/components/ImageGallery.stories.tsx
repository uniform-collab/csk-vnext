import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Image from '@/components/canvas/Image';
import ImageGallery, { ImageGalleryParameters } from '@/components/canvas/ImageGallery';
import { ContainerArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageGallery> = {
  title: 'Component Starter Kit/Components/Image Gallery',
  component: ImageGallery,
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<ImageGalleryParameters>> = {
  displayName: { control: 'text' },
  aspectRatio: { control: 'select', options: ['square', 'video'] },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Image Gallery',
    aspectRatio: 'square',
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: (args: ImageGalleryParameters) => {
    const route = createFakeCompositionData('imageGallery', undefined, args, {
      imageGalleryItems: Array.from({ length: 5 }, () => ({
        type: 'image',
        parameters: createUniformParameter({
          image: IMAGE_ASSET,
          objectFit: 'cover',
        }),
      })),
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            imageGallery: ImageGallery,
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
