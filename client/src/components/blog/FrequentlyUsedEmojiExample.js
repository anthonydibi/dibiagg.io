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
          fontSize={'lg'}
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
      <Box maxW="600px">
        <Grid
          gridTemplateColumns={'1fr 1fr'}
          gap={'0px 20px'}
          border={'1px'}
          borderRadius='10px'
          p={'2'}
          mx={'auto'}
          overflowX={'scroll'}
          h={'300px'}
        >
          <GridItem textAlign={'start'} px={2}>
            <Heading as={'text'} size={'sm'}>
              Frequently Used
            </Heading>
          </GridItem>
          <GridItem textAlign={'start'} px={2}>
            <Heading as={'text'} size={'sm'}>
              All Emojis
            </Heading>
          </GridItem>
          <GridItem overflow={'scroll'} p={'2'}>
            <Grid templateColumns={'1fr 1fr 1fr 1fr 1fr'}>
              {cachedEmojis.map((emoji) => (
                <GridItem key={emoji}>
                  <ClickableEmoji emoji={emoji} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
          <GridItem overflowY={'scroll'} p={'2'}>
            <Grid templateColumns={'1fr 1fr 1fr 1fr 1fr'}>
              {emojis.map((emoji) => (
                <GridItem key={emoji}>
                  <ClickableEmoji emoji={emoji} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
        <InputGroup mt={'4'} mb={'8'} mx={'auto'}>
          <Input value={emojiInputs} fontSize={'2xl'} borderRadius='10px' />
          <InputRightElement
            cursor={'pointer'}
            onClick={() => setEmojiInputs('')}
          >
            <IoMdSend />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}

export default FrequentlyUsedEmojiExample;
