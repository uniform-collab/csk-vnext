import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Badge, Button, TableCustomCell, TableDataCell, TableHeaderCell, TableRow, Text } from '@/components/canvas';
import Table, { TableParameters } from '@/components/canvas/Table';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { tableDefault, tableWithCustomCells } from '../../canvasMock/components/table';

const meta: Meta<typeof Table> = {
  title: 'Component Starter Kit/Components/Table',
  component: Table,
};

const mapper: ComponentMapping = {
  table: Table,
  tableRow: TableRow,
  tableHeaderCell: TableHeaderCell,
  tableDataCell: TableDataCell,
  tableCustomCell: TableCustomCell,
  button: Button,
  text: Text,
  badge: Badge,
};

const colorKeys = Object.keys(theme.extend.colors || {});
const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('table'));

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TableParameters>> = {
  displayName: { control: 'text' },
  size: { control: 'select', options: sizeKeys },
  textColor: { control: 'select', options: colorKeys },
  ...baseContainerArgTypes,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    displayName: 'Table',
    textColor: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
    size: sizeKeys[0],
  },
  argTypes,
  render: (args: TableParameters) => {
    const route = createFakeCompositionData(
      'table',
      undefined,
      {
        ...args,
      },
      tableDefault
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => ({
          component: mapper[component?.type] || DefaultNotImplementedComponent,
        })}
        mode="server"
      />
    );
  },
};

export const WithCustomCells: Story = {
  args: {
    displayName: 'Table',
    textColor: 'text-primary',
    backgroundColor: 'text-secondary',
    fluidContent: false,
    fullHeight: false,
  },
  argTypes,
  render: (args: TableParameters) => {
    const route = createFakeCompositionData(
      'table',
      undefined,
      {
        ...args,
      },
      tableWithCustomCells
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => ({
          component: mapper[component?.type] || DefaultNotImplementedComponent,
        })}
        mode="server"
      />
    );
  },
};
