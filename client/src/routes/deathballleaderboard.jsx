import { useEffect, useState } from "react"
import { Spacer, Stack, Box, Th, Tr, Table, Thead, Center, Td, Tbody, TableContainer, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { GiCrenelCrown } from 'react-icons/gi'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


export default function DeathballLeaderboard(){
    const API_URL = 'https://dibiaggdotio.herokuapp.com';

    const [standings, setStandings] = useState([]);
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(15);
    const [max, setMax] = useState(0);
    const [navInfo, setNavInfo] = useState("");

    const fetchNumPlayers = () => {
        return fetch(API_URL + '/deathball/standings/count')
            .then(response => response.json())
            .then(data => {
                setMax(parseInt(data.count));
            })
    }

    useEffect(() => {
        fetchNumPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchStandings = (startIn, stopIn) => {
            return fetch(API_URL + '/deathball/standings?' + new URLSearchParams({start: startIn, stop: stopIn}))
                .then(response => response.json())
                .then(data => {
                    setStandings(data);
                    setNavInfo(`${start} to ${stop}`);
                })
        }

        fetchStandings(start, stop);
    }, [start, stop])

    const next = () => {
        if(stop < max){
            setStart(start + 15);
            setStop(stop + 15);
        }
    }

    const back = () => {
        if(start - 15 >= 0){
            setStart(start - 15);
            setStop(stop - 15);
        }
    }
     
    return (
        <>
            <Box w="100%" h="100px"></Box>
            <Flex>
                <Spacer as={Flex} justify={"end"} align={"center"}>
                    <Heading size="md">RANK 1</Heading>
                </Spacer>
                <Flex direction={"column"} mb="5" w="200px" h="200px" justify={"center"} align={"center"}>
                    <GiCrenelCrown size={100}/>
                    <Heading>{standings[0]?.name.toUpperCase()}</Heading>
                </Flex>
                <Spacer />
            </Flex>
            <Center>
            <Stack w={{base: "90%", md: "60%"}} border="1px solid" boxShadow={"xl"}>
                <TableContainer>
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>Rank</Th>
                                <Th>Player</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {standings.slice(1).map((player) => {
                            return (
                                <Tr>
                                    <Td>{player.rank == 1 ? 2 : player.rank}</Td>
                                    <Td>{player.name.toUpperCase()}</Td>
                                </Tr>
                            );
                        })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Stack p={1} mt="5" direction={"row"} w="100%" justify={"right"} align={"center"}>
                    <IconButton size="sm" rounded='full' icon={<AiFillCaretLeft/>} onClick={back}>

                    </IconButton>
                    <Text>{navInfo}</Text>
                    <IconButton size="sm" rounded="full" icon={<AiFillCaretRight/>} onClick={next}>

                    </IconButton>
                </Stack>
            </Stack>
            </Center>
        </>
    );
}