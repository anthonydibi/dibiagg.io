import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react";


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
    })

    const next = () => {
        if(start + 15 < max){
            setStart(start + 15);
            setStop(stop + 15);
        }
    }

    const back = () => {
        if(start - 15 <= 0){
            setStart(start - 15);
            setStop(stop - 15);
        }
    }
     
    return (
        <>
            <Box w="80%">
                test
            </Box>
        </>
    );
}