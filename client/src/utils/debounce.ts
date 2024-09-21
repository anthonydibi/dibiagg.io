export const debounce = (func: Function, wait: number, immediate: boolean) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: any) {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
