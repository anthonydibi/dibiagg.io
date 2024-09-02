import { ReactElement, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

/**
 * Gets markup from a React component, mainly for use with external libs (e.g. taking a react-icon and extruding it in threejs)
 * @param component React component
 */
export const useComponentMarkup = (component: ReactElement) => {
  const markup = useMemo(() => {
    if (window === undefined)
      throw new Error(
        'useComponentMarkup uses react-dom/client can only be used in the browser',
      );
    const div = document.createElement('div');
    const root = createRoot(div);
    flushSync(() => {
      root.render(component);
    });
    const markup = div.innerHTML;

    // cleanup
    root.unmount();
    div.remove();

    return markup;
  }, [component]);

  return markup;
};
