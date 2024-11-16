import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Text, AccordionItem } from '@/components/canvas';
import Accordion, { AccordionParameters } from '@/components/canvas/Accordion';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { accordionDefault } from '../../canvasMock/components/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Component Starter Kit/Components/Accordion',
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const argTypes: Partial<ArgTypes<AccordionParameters>> = {
  ...ContainerArgTypes,
};
export const Default: Story = {
  args: {
    displayName: 'Frequently Asked Questions',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'accordion',
      undefined,
      {
        ...args,
      },
      accordionDefault
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            accordion: Accordion,
            accordionItem: AccordionItem,
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
