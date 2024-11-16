import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Flex, Text } from '@/components/canvas';
import Grid, { GridParameters } from '@/components/canvas/Grid';
import { simpleStatsContent, gridStatsContent } from '@/stories/canvasMock/patterns/stats';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Grid> = {
  title: 'Component Starter Kit/Patterns/Stats',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

const argTypes: Partial<ArgTypes<GridParameters>> = {
  displayName: { control: 'text' },
};

const renderStory = (content: typeof simpleStatsContent) => (args: GridParameters) => {
  const route = createFakeCompositionData(
    'grid',
    content.type,
    {
      ...args,
      ...content.parameters,
    },
    content.slots
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={({ component }: { component: ComponentInstance }) => {
        const mapper: ComponentMapping = {
          grid: Grid,
          flex: Flex,
          text: Text,
        };
        return {
          component: mapper[component?.type] || DefaultNotImplementedComponent,
        };
      }}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Simple Stat',
  },
  argTypes,
  render: renderStory(simpleStatsContent),
};

export const GridStats: Story = {
  args: {
    displayName: 'Grid Stat',
  },
  argTypes,
  render: renderStory(gridStatsContent),
};
