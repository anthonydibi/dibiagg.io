import { useEffect, useState } from 'react'
import {
  Spacer,
  Stack,
  Th,
  Tr,
  Table,
  Thead,
  Center,
  Td,
  Tbody,
  TableContainer,
  Flex,
  Heading,
  Text,
  IconButton,
  Skeleton,
  SlideFade,
  useToken,
} from '@chakra-ui/react'
import { GiCrenelCrown } from 'react-icons/gi'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { fetchStandings } from '../services/DeathballApi'


export default function Leaderboard(props) {
  const ENTRIES_PER_PAGE = props.entriesPerPage

  const [standings, setStandings] = useState([])
  const [page, setPage] = useState(0)
  const [navInfo, setNavInfo] = useState('')
  const [topPlayer, setTopPlayer] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchStandings(page, ENTRIES_PER_PAGE).then((data) => {
      if (page === 0) setTopPlayer({ ...data[0] })
      setNavInfo(
        `${page * ENTRIES_PER_PAGE} TO ${(page + 1) * ENTRIES_PER_PAGE - 1}`,
      )
      setIsLoaded(true)
      setStandings(data)
    })
  }, [page, ENTRIES_PER_PAGE])

  const next = () => {
    setIsLoaded(false)
    setPage(page + 1)
  }

  const back = () => {
    if (page > 0) {
      setIsLoaded(false)
      setPage(page - 1)
    }
  }

  const LeaderboardTopRank = (props) => {
    return (
      <Flex
        direction={'column'}
        mb="5"
        w="200px"
        h="200px"
        justify={'center'}
        align={'center'}
      >
        <SlideFade offsetY="-80px" in={isLoaded}>
          <GiCrenelCrown size={100} color={useToken('colors', 'accent')} />
        </SlideFade>
        <Heading>{props.player ? props.player.name.toUpperCase() : ''}</Heading>
      </Flex>
    )
  }

  return (
    <>
      <Flex>
        <Spacer as={Flex} justify={'end'} align={'center'}>
          <Heading ml="1" size="md">
            RANK 1
          </Heading>
        </Spacer>
        <LeaderboardTopRank player={topPlayer} />
        <Spacer as={Flex} justify={'start'} align={'center'}>
          <Text p="2">{`${topPlayer ? topPlayer.wins : ''} WINS ${
            topPlayer ? topPlayer.losses : ''
          } LOSSES`}</Text>
        </Spacer>
      </Flex>
      <Center>
        <Stack
          w={{ base: '90%', md: '60%' }}
          border="1px solid"
          borderBottom="0px none"
        >
          <Skeleton isLoaded={isLoaded}>
            <TableContainer h="730px" overflowY="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Player</Th>
                    <Th>Wins</Th>
                    <Th>Losses</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {page === 0
                    ? standings.slice(1).map((player) => {
                        //if on first page take off first player in the result since they are displayed above the table
                        return (
                          <Tr key={player.name}>
                            <Td>
                              {parseInt(player.rank) === 1 ? 2 : player.rank}
                            </Td>
                            <Td>{player.name.toUpperCase()}</Td>
                            <Td>{player.wins}</Td>
                            <Td>{player.losses}</Td>
                          </Tr>
                        )
                      })
                    : standings.map((player) => {
                        return (
                          <Tr key={player.name}>
                            <Td>
                              {parseInt(player.rank) === 1 ? 2 : player.rank}
                            </Td>
                            <Td>{player.name.toUpperCase()}</Td>
                            <Td>{player.wins}</Td>
                            <Td>{player.losses}</Td>
                          </Tr>
                        )
                      })}
                </Tbody>
              </Table>
            </TableContainer>
          </Skeleton>
          <Stack
            borderTop="1px solid"
            p={1}
            mt="5"
            direction={'row'}
            w="100%"
            justify={'right'}
            align={'center'}
          >
            <IconButton
              size="sm"
              rounded="full"
              icon={<AiFillCaretLeft />}
              onClick={back}
            ></IconButton>
            <Text>{navInfo}</Text>
            <IconButton
              size="sm"
              rounded="full"
              icon={<AiFillCaretRight />}
              onClick={next}
            ></IconButton>
          </Stack>
        </Stack>
      </Center>
    </>
  )
}
