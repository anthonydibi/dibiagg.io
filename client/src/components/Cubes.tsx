import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

export const Cubes: FC = () => {
  return (
    <Flex direction="row" alignItems="center" gap={['16px', null, '20px']}>
      <div className="cube accent">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="cube accent">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="cube accent">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="cube accent">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="cube white">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="front"></div>
        <div className="back"></div>
      </div>
    </Flex>
  );
};
