import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Video, { VideoParameters } from '@/components/canvas/Video';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Video> = {
  title: 'Component Starter Kit/Components/Video',
  component: Video,
};

export default meta;
type Story = StoryObj<typeof Video>;
const argTypes: Partial<ArgTypes<VideoParameters>> = {
  autoPlay: { control: 'boolean' },
  lazyLoad: { control: 'boolean' },
  loop: { control: 'boolean' },
  controls: { control: 'boolean' },
  muted: { control: 'boolean' },
};

export const Default: Story = {
  args: {
    url: {
      type: 'url',
      path: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-cristian-rojas.mp4',
    },
    autoPlay: false,
    loop: true,
    muted: true,
    controls: true,
    lazyLoad: true,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('video', undefined, {
      ...args,
      placeholderImage: IMAGE_ASSET,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            video: Video,
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
