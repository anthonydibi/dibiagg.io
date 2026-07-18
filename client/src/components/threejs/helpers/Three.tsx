import { PropsWithChildren } from 'react';
import viewTunnel from './ViewTunnel';

const Three = ({ children }: PropsWithChildren) => (
  <viewTunnel.In>{children}</viewTunnel.In>
);

export default Three;
