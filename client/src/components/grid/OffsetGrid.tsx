import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { skills } from './constants';

const SIZE = '130px';
const MARGIN = '4px';
const F = `calc(${SIZE} * 1.732 + 4 * ${MARGIN} - 1px)`;

export interface OffsetGridItemProps {
  name: string;
  icon: any;
}

const OffsetGridItem: FC<OffsetGridItemProps> = ({ name, icon }) => {
  return (
    <Button
      variant="outline"
      position="relative"
      background="white"
      width={SIZE}
      margin={MARGIN}
      h={`calc(${SIZE} * 1.1547)`}
      display="inline-block"
      fontSize="initial"
      clipPath="polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%)"
      marginBottom={`calc(${MARGIN} - ${SIZE} * .2885)`}
    >
      <Flex
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap="4px"
      >
        <Heading size="md">{name}</Heading>
        <Icon overflow="visible" boxSize={`calc(${SIZE} / 2.5)`} as={icon} />
      </Flex>
    </Button>
  );
};

const OffsetGrid: FC = (props) => {
  return (
    <Flex>
      <Box
        minH="160px"
        paddingBottom={`calc(${SIZE} + ${MARGIN})`}
        whiteSpace={['nowrap', null, 'initial']}
        overflowY="visible"
        overflowX={['auto', null, 'initial']}
        fontSize={0}
        _before={{
          content: `""`,
          width: `calc(${SIZE} / 2 + ${MARGIN})`,
          float: 'left',
          height: '140%',
          shapeOutside: `repeating-linear-gradient(#0000 0 calc(${F} - 3px), #000 0 ${F})`,
        }}
      >
        {skills.map((skill, i) => (
          <OffsetGridItem key={i} name={skill.name} icon={skill.icon} />
        ))}
      </Box>
    </Flex>
  );
};

export default OffsetGrid;
