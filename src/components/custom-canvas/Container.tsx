import { FC } from 'react';
import CSKContainer, { ContainerProps as CSKContainerProps } from '@/components/canvas/Container';

// This is an example of how you can override an existing CSK component based on the Container component.
const Container: FC<CSKContainerProps> = props => <CSKContainer {...props} />;

export default Container;
