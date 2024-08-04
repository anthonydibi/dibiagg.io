import { Box } from '@chakra-ui/react';

export interface CodeLineNumberProps {
  number: number;
}

const CodeLineNumber: React.FC<CodeLineNumberProps> = ({ number }) => (
  <Box
    color={'accent'}
    paddingRight={'0.5rem'}
    userSelect={'none'}
    display={'table-cell'}
    borderRight={'1px solid var(--accent)'}
  >
    {number}
  </Box>
);

export default CodeLineNumber;
