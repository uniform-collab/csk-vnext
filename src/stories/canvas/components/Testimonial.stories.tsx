import { ComponentInstance } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-next-rsc/component';
import { Text, Button, Image } from '@/components/canvas';
import Testimonial, { TestimonialParameters, TestimonialVariants } from '@/components/canvas/Testimonial';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { getTestimonialDefaultContent } from '../../canvasMock/components/testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Component Starter Kit/Components/Testimonial',
  component: Testimonial,
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<TestimonialParameters>> = {
  displayName: { control: 'text' },
  ...baseContainerArgTypes,
};

const renderStory = (variant?: TestimonialVariants) => (args: TestimonialParameters) => {
  const route = createFakeCompositionData(
    'testimonial',
    variant,
    {
      ...args,
    },
    getTestimonialDefaultContent(variant)
  );
  return (
    <UniformComposition
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={({ component }: { component: ComponentInstance }) => {
        const mapper: ComponentMapping = {
          testimonial: Testimonial,
          text: Text,
          button: Button,
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

export const Default: Story = {
  args: {
    displayName: 'Default',
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(),
};

export const WithLargeAvatar: Story = {
  args: {
    displayName: 'Default',
    spacing: {
      paddingTop: 'container-large',
      paddingBottom: 'container-large',
    },
  },
  argTypes,
  render: renderStory(TestimonialVariants.WithLargeAvatar),
};

export const WithOverlappingImage: Story = {
  args: {
    displayName: 'Testimonial',
    spacing: {
      marginTop: 'container-large',
      marginBottom: 'container-large',
    },
    backgroundColor: 'general-color-2',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: renderStory(TestimonialVariants.WithOverlappingImage),
};
