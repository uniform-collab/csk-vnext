import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Button, Image, Section, Text } from '@/components/canvas';
import Flex, { FlexParameters } from '@/components/canvas/Flex';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { titledContainerContent } from '../../canvasMock/patterns/titledContainer';

const meta: Meta<typeof Flex> = {
  title: 'Component Starter Kit/Patterns/Titled Container',
  component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

const { displayName: _ } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<FlexParameters>> = {
  displayName: { control: 'text' },
  backgroundColor: ContainerArgTypes.backgroundColor,
  fluidContent: ContainerArgTypes.fluidContent,
};

export const Default: Story = {
  args: {
    displayName: 'Titled Container',
  },
  argTypes,
  render: (args: FlexParameters) => {
    const route = createFakeCompositionData(
      'flex',
      titledContainerContent.type,
      {
        ...args,
        ...titledContainerContent.parameters,
      },
      titledContainerContent.slots
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            section: Section,
            text: Text,
            button: Button,
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
