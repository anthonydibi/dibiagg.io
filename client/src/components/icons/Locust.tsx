import { IconProps } from './types';

const Locust: React.FC<IconProps> = (props) => {
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
      <g transform="matrix(.43 0 0 .43 .5 4.5)">
        <path d="M36.694 18.975 48.943 6.626 47.341 5.012 35.092 17.361l1.602 1.614Z" />
        <path d="M40.954 20.093 53.03 8.017l-1.614-1.614L39.34 18.479l1.614 1.614Z" />
        <path d="M37.215 17.411h2.459v7.152h-2.459z" />
        <path d="m14.632 4.173-3.353 1.631-.347.169-6.486 24.853h6.435l4.502-17.232 17.233 17.232h8.669L14.632 4.173Z" />
        <path d="m4.722 26.007-1.039 3.981H0v-1.812l4.722-2.169Zm22.663-10.412 12.56-5.771h3.76l3.759 3.759v6.38l-3.645 3.645-4.618-4.68-1.176 1.16 9.768 9.9h-6.015L27.385 15.595Zm-13.153 6.042 5.412-2.486 7.965 7.965-6.647 2.872H12.05l2.182-8.351Z" />
      </g>
    </svg>
  );
};

export default Locust;
