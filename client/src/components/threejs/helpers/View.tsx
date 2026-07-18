import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from 'react';
import { View as ViewImpl } from '@react-three/drei';
import Three from './Three';

export interface ViewProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null!);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>
          <ViewImpl track={localRef}>{children}</ViewImpl>
        </Three>
      </>
    );
  },
);

View.displayName = 'View';

export default View;
