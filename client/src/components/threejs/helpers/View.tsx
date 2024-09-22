import {
  FC,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from 'react';
import { View as ViewImpl } from '@react-three/drei';

export interface ViewProps extends PropsWithChildren {}

const View: FC<ViewProps> = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props}>
        <ViewImpl
          track={localRef}
          style={{ width: '100%', height: '100%' }}
          track={localRef}
        >
          {children}
        </ViewImpl>
      </div>
    </>
  );
});

export default View;
