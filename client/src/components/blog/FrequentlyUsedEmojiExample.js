import { useRef, useState } from 'react';
import LFUCache from '../../utils/LFUCache';
import allEmojis from '../../utils/AllEmojis';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';

const emojis = allEmojis.slice(100, 500);

function FrequentlyUsedEmojiExample() {
  const cache = useRef(new LFUCache(28));
  const [cachedEmojis, setCachedEmojis] = useState([]);
  const [emojiInputs, setEmojiInputs] = useState('');

  const onEmojiInput = (emoji) => {
    setEmojiInputs(emojiInputs + emoji);
    cache.current.set(emoji, emoji); //emojis are just text so we don't need an identifier as the key
    setCachedEmojis(cache.current.toList(false));
  };

  const ClickableEmoji = (props) => {
    return (
      <>
        <Box
          userSelect={'none'}
          as={'span'}
          cursor={'pointer'}
          fontSize={'4xl'}
          onClick={() => onEmojiInput(props.emoji)}
          aria-label={
            'A clickable emoji - emojis in this dataset are not tagged, so further information about the content is unavailable.'
          }
        >
          {props.emoji}
        </Box>
      </>
    );
  };

  return (
    <>
      <Grid
        gridTemplateColumns={'1fr 1fr'}
        gap={'0px 20px'}
        border={'1px'}
        p={'2'}
        mx={'auto'}
        overflowX={'scroll'}
        h={'300px'}
      >
        <GridItem textAlign={'center'}>
          <Heading as={'text'} size={'md'}>
            Frequently Used
          </Heading>
        </GridItem>
        <GridItem textAlign={'center'}>
          <Heading as={'text'} size={'md'}>
            All Emojis
          </Heading>
        </GridItem>
        <GridItem overflow={'scroll'} p={'2'}>
          <Grid templateColumns={'1fr 1fr 1fr 1fr'} gap={'10px'}>
            {cachedEmojis.map((emoji) => (
              <GridItem key={emoji}>
                <ClickableEmoji emoji={emoji} />
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem overflowY={'scroll'} p={'2'}>
          <Grid templateColumns={'1fr 1fr 1fr 1fr 1fr'} gap={'10px'}>
            {emojis.map((emoji) => (
              <GridItem key={emoji}>
                <ClickableEmoji emoji={emoji} />
              </GridItem>
            ))}
          </Grid>
        </GridItem>
      </Grid>
      <InputGroup mt={'4'} mb={'8'} mx={'auto'}>
        <Input value={emojiInputs} fontSize={'2xl'} />
        <InputRightElement
          cursor={'pointer'}
          onClick={() => setEmojiInputs('')}
        >
          <IoMdSend />
        </InputRightElement>
      </InputGroup>
    </>
  );
}

export default FrequentlyUsedEmojiExample;
