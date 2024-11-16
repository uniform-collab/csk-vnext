import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import Image from '@/components/canvas/Image';
import Link, { LinkParameters } from '@/components/canvas/Link';
import Text from '@/components/canvas/Text';
import { UNIFORM_LOGO_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Link> = {
  title: 'Component Starter Kit/Components/Link',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

const argTypes: Partial<ArgTypes<LinkParameters>> = {
  openInNewTab: { control: 'check' },
};
export const WithImage: Story = {
  args: {
    link: { type: 'url', path: '/' },
    openInNewTab: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'link',
      undefined,
      {
        ...args,
      },
      {
        linkContent: [
          {
            type: 'image',
            parameters: createUniformParameter({
              image: UNIFORM_LOGO_ASSET,
              objectFit: 'contain',
              width: 174,
              height: 50,
            }),
          },
        ],
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            link: Link,
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

export const WithText: Story = {
  args: {
    link: { type: 'url', path: '/' },
    openInNewTab: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'link',
      undefined,
      {
        ...args,
      },
      {
        linkContent: [
          {
            type: 'text',
            parameters: createUniformParameter({
              tag: 'span',
              size: '2xl',
              text: 'Built with the modern stack!',
              color: 'text-primary',
            }),
          },
        ],
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            link: Link,
            text: Text,
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
