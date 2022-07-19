import { useEffect, useState } from "react"
import { Stack, Box, Th, Tr, Table, Thead, Center, Td, Tbody, TableContainer, Flex, Heading, useColorModeValue, IconButton } from "@chakra-ui/react";
import { GiCrenelCrown } from 'react-icons/gi'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'


export default function DeathballLeaderboard(){
    const API_URL = 'https://dibiaggdotio.herokuapp.com';

    const [standings, setStandings] = useState([]);
    const [start, setStart] = useState(0);
    const [stop, setStop] = useState(15);
    const max = 0;

    const fetchNumPlayers = () => {
        return fetch(API_URL + '/deathball/count')
            .then(response => response.json())
            .then(data => {
                max = data.count;
            })
    }

    const fetchStandings = (startIn, stopIn) => {
        return fetch(API_URL + '/deathball/standings?' + new URLSearchParams({start: startIn, stop: stopIn}))
            .then(response => response.json())
            .then(data => {
                setStandings(data);
            })
    }

    useEffect(() => {
        fetchNumPlayers();
    }, [])

    useEffect(() => {
        fetchStandings(start, stop);
    }, [start, stop])

    const next = () => {
        if(start + 15 < max){
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

    const LeaderboardEntry = (player) => {

    }
     
    return (
        <>
            <Box w="100%" h="100px"></Box>
            <Center>
                <Flex direction={"column"} mb="5" w="300px" h="200px" justify={"center"} align={"center"}>
                    <GiCrenelCrown size={100}/>
                    <Heading>{standings[0]?.name.toUpperCase()}</Heading>
                </Flex>
            </Center>
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
                                    <Td>{player.rank}</Td>
                                    <Td>{player.name.toUpperCase()}</Td>
                                </Tr>
                            );
                        })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Stack p={1} mt="5" direction={"row"} w="100%" justify={"right"} align={"center"}>
                    <IconButton rounded='full' icon={<AiFillCaretLeft/>} onClick={back}>

                    </IconButton>
                    <IconButton rounded="full" icon={<AiFillCaretRight/>} onClick={next}>

                    </IconButton>
                </Stack>
            </Stack>
            </Center>
        </>
    );
}