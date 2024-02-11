import { Box } from '@chakra-ui/react';
import Leaderboard from '../../components/Leaderboard';
import SEO from '../../components/seo';

export default function DeathballLeaderboard() {
  return (
    <>
      <SEO
        description="Deathball clone leaderboard"
        title="Deathball leaderboard"
        siteTitle="dibiagg.io"
      />
      <Box minH="95vh">
        <Leaderboard entriesPerPage={15} />
      </Box>
    </>
  );
}
