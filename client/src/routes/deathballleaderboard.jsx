import Leaderboard from "../components/Leaderboard";


export default function DeathballLeaderboard(){
     
    return (
        <>
            <Leaderboard standingsUrl={"https://dibiaggdotio.herokuapp.com/deathball/standings"} entriesPerPage={15}/>
        </>
    );
}