import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import {
  Flex,
  Footer,
  Grid,
  GridItem,
  Image,
  NavigationLink,
  RichText,
  Spacer,
  Text,
} from '../../../components/canvas';
import { FooterParameters } from '../../../components/canvas/Footer';
import { footerDefault } from '../../canvasMock/components/footer';

const meta: Meta<typeof Footer> = {
  title: 'Component Starter Kit/Components/Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

const argTypes: Partial<ArgTypes<FooterParameters>> = {
  backgroundColor: ContainerArgTypes.backgroundColor,
  border: ContainerArgTypes.border,
  fluidContent: ContainerArgTypes.fluidContent,
};

export const Default: Story = {
  args: {
    backgroundColor: 'text-secondary',
    spacing: {
      marginTop: 'container-small',
      marginBottom: 'container-small',
      marginRight: 'container-small',
      marginLeft: 'container-small',
      paddingTop: 'container-medium',
      paddingBottom: 'container-medium',
      paddingRight: 'container-medium',
      paddingLeft: 'container-medium',
    },
    border: 'border-footer',
    fluidContent: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'footer',
      undefined,
      {
        ...args,
      },
      footerDefault
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={({ component }: { component: ComponentInstance }) => {
          const mapper: ComponentMapping = {
            footer: Footer,
            text: Text,
            image: Image,
            richText: RichText,
            flex: Flex,
            navigationLink: NavigationLink,
            grid: Grid,
            gridItem: GridItem,
            spacer: Spacer,
          };
          return {
            component: mapper[component?.type] ?? DefaultNotImplementedComponent,
          };
        }}
        mode="server"
      />
    );
  },
};
