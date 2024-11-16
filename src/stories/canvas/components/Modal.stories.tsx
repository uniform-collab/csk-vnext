import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Button, Flex, Spacer, Text } from '@/components/canvas';
import Modal, { ModalParameters } from '@/components/canvas/Modal';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { modalDefault, modalWithActionButtons } from '../../canvasMock/components/modal';

const meta: Meta<typeof Modal> = {
  title: 'Component Starter Kit/Components/Modal',
  component: Modal,
};

const mapper: ComponentMapping = {
  modal: Modal,
  button: Button,
  text: Text,
  spacer: Spacer,
  flex: Flex,
};

const colorKeys = Object.keys(theme.extend.colors || {});

const argTypes: Partial<ArgTypes<ModalParameters>> = {
  maxWidth: { control: 'select', options: ['small', 'medium', 'large'] },
  closeIconColor: { control: 'select', options: colorKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  disableCloseModalOnClickOutside: { control: 'boolean' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    maxWidth: 'medium',
    backgroundColor: 'text-secondary',
    closeIconColor: 'text-primary',
    disableCloseModalOnClickOutside: false,
  },
  argTypes,
  render: (args: ModalParameters) => {
    const route = createFakeCompositionData(
      'modal',
      undefined,
      {
        ...args,
      },
      modalDefault
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

export const WithActionButtons: Story = {
  args: {
    maxWidth: 'medium',
    backgroundColor: 'text-secondary',
    closeIconColor: 'text-primary',
    disableCloseModalOnClickOutside: true,
  },
  argTypes,
  render: (args: ModalParameters) => {
    const route = createFakeCompositionData(
      'modal',
      undefined,
      {
        ...args,
      },
      modalWithActionButtons
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
