import React, { FC } from 'react';

interface EmojiProps {
  label: string;
  symbol: string;
}

const Emoji: FC<EmojiProps> = ({ label, symbol }) => {
  return (
    <span aria-label={label} role="img">
      {symbol}
    </span>
  );
};

export default Emoji;
