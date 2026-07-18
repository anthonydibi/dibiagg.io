import { IconProps } from './types';

const AiSparkle: React.FC<IconProps> = (props) => {
  const { size = '1em', color = 'currentColor' } = props;

  return (
    <svg
      width={size}
      height={size}
      fill={color}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m9 4 2.5 5.5L17 12l-5.5 2.5L9 20l-2.5-5.5L1 12l5.5-2.5L9 4Z" />
      <path d="m19 1 1.25 2.75L23 5l-2.75 1.25L19 9l-1.25-2.75L15 5l2.75-1.25L19 1Z" />
      <path d="m19 15 1.25 2.75L23 19l-2.75 1.25L19 23l-1.25-2.75L15 19l2.75-1.25L19 15Z" />
    </svg>
  );
};

export default AiSparkle;
