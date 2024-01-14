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
      <Leaderboard entriesPerPage={15} />
    </>
  );
}
