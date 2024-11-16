import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Text, NavigationFlyout, NavigationGroup, NavigationLink, Button, Card, Image } from '@/components/canvas';
import Header, { HeaderParameters } from '@/components/canvas/Header';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { headerDefault, headerWithFlyout, headerWithGroups, headerWithLinks } from '../../canvasMock/components/header';

const colorKeys = Object.keys(theme.extend.colors || {});

const meta: Meta<typeof Header> = {
  title: 'Component Starter Kit/Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

const argTypes: Partial<ArgTypes<HeaderParameters>> = {
  backgroundColor: {
    control: 'select',
    options: colorKeys,
  },
  color: {
    control: 'select',
    options: colorKeys,
  },
  spacing: {
    control: 'object',
    description: 'Spacing configuration for the header',
  },
  border: {
    control: 'text',
    description: 'Border styling for the header',
  },
};

const renderStory = (content: Record<string, ComponentInstance[]>) => (args: HeaderParameters) => {
  const route = createFakeCompositionData(
    'header',
    undefined,
    {
      ...args,
    },
    content
  );

  return (
    <UniformComposition
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={({ component }: { component: ComponentInstance }) => {
        const mapper: ComponentMapping = {
          header: Header,
          text: Text,
          button: Button,
          navigationFlyout: NavigationFlyout,
          navigationGroup: NavigationGroup,
          navigationLink: NavigationLink,
          card: Card,
          image: Image,
        };
        return {
          component: mapper[component?.type] || DefaultNotImplementedComponent,
        };
      }}
      mode="server"
    />
  );
};

// Stories
export const Default: Story = {
  args: {
    backgroundColor: 'general-color-2',
    color: 'general-color-1',
    spacing: {
      paddingTop: 'container-small',
      paddingBottom: 'container-small',
    },
  },
  argTypes,
  render: renderStory(headerDefault),
};

export const WithLinks: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithLinks),
};

export const WithGroups: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithGroups),
};

export const WithFlyout: Story = {
  args: Default.args,
  argTypes,
  render: renderStory(headerWithFlyout),
};
