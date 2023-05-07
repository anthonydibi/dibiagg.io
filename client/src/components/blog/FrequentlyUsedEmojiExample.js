import { useRef, useState } from 'react'
import LFUCache from '../../utils/LFUCache';
import allEmojis from '../../utils/AllEmojis';
import { Box, Grid, GridItem, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import {IoMdSend} from 'react-icons/io'

const emojis = allEmojis.slice(0, 400);

function FrequentlyUsedEmojiExample() {
    const cache = useRef(new LFUCache(21));
    const [cachedEmojis, setCachedEmojis] = useState([]);
    const [emojiInputs, setEmojiInputs] = useState("");
    
    const onEmojiInput = (emoji) => {
        setEmojiInputs(emojiInputs + emoji);
        cache.current.set(emoji, emoji); //emojis are just text so we don't need an identifier as the key
        setCachedEmojis(cache.current.toList(false));
    }

    const ClickableEmoji = (props) => {
        return (
            <>
                <Box userSelect={"none"} as={'span'} cursor={"pointer"} fontSize={"4xl"} onClick={() => onEmojiInput(props.emoji)} aria-label={"A clickable emoji - emojis in this dataset are not tagged, so further information about the content is unavailable."}>
                  {props.emoji}
                </Box>
            </>
        );
    }

    return ( 
        <>
            <Grid maxW={"800px"} h={"200px"} gridTemplateColumns={"1fr 1.5fr"} gap={"1"} border={"1px"} p={"2"} mx={"auto"}>
                <GridItem textAlign={"center"}>
                    <Heading as={"text"} size={"md"}>
                        Frequently Used
                    </Heading>
                </GridItem>
                <GridItem textAlign={"center"}>
                    <Heading as={"text"} size={"md"}>
                        Emojis
                    </Heading>
                </GridItem>
                <GridItem overflowY={"scroll"} p={"2"}>
                    {cachedEmojis.map((emoji) => (
                        <ClickableEmoji emoji={emoji}/>
                    ))}
                </GridItem>
                <GridItem overflowY={"scroll"} letterSpacing={"1px"} p={'2'}>
                    {emojis.map((emoji) => (
                        <ClickableEmoji emoji={emoji}/>
                    ))}
                </GridItem>
            </Grid>
            <InputGroup maxW={"800px"} mt={"4"} mb={'8'} mx={"auto"}>
                <Input value={emojiInputs} fontSize={"2xl"} />
                <InputRightElement cursor={"pointer"} onClick={ () => setEmojiInputs("") } children={<IoMdSend />} readonly/>
            </InputGroup>
        </>
     );
}

export default FrequentlyUsedEmojiExample;