import { IconProps } from './types';

const Threejs: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      stroke-width="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 22l-5 -19l19 5.5z"></path>
      <path d="M12.573 17.58l-6.152 -1.576l8.796 -9.466l1.914 6.64"></path>
      <path d="M12.573 17.58l-1.573 -6.58l6.13 2.179"></path>
      <path d="M9.527 4.893l1.473 6.107l-6.31 -1.564z"></path>
    </svg>
  );
};

export default Threejs;
