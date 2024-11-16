import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Image } from '@/components/canvas';
import Flex, { FlexParameters } from '@/components/canvas/Flex';
import { ContainerArgTypes } from '@/stories/argTypes';
import { IMAGE_ASSET } from '@/stories/assets';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Flex> = {
  title: 'Component Starter Kit/Components/Flex',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<FlexParameters>> = {
  displayName: { control: 'text' },
  direction: { control: 'select', options: ['row', 'row-reverse', 'col', 'col-reverse'] },
  justifyContent: { control: 'select', options: ['start', 'end', 'center', 'between'] },
  alignItems: { control: 'select', options: ['start', 'end', 'center', 'stretch'] },
  gap: { control: 'select', options: ['2', '8', '16'] },
  ...baseContainerArgTypes,
};

export const Default: Story = {
  args: {
    displayName: 'Flex',
    direction: 'row',
    justifyContent: 'between',
    gap: '8',
    alignItems: 'center',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: (args: FlexParameters) => {
    const route = createFakeCompositionData(
      'flex',
      undefined,
      {
        ...args,
      },
      {
        flexItem: Array.from({ length: 3 }, () => ({
          type: 'image',
          parameters: createUniformParameter({
            image: IMAGE_ASSET,
            objectFit: 'cover',
            width: 250,
            height: 250,
          }),
        })),
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
            image: Image,
            flex: Flex,
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
