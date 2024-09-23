import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState('');
  const { asPath } = useRouter();

  useEffect(() => {
    setIsClient(true);
    setHash(decodeURIComponent(asPath.split('#')[1]));
  }, [asPath]);

  return isClient ? hash : null;
};

export default useHash;
