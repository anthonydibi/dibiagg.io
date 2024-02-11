import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio, Box, useColorModeValue } from '@chakra-ui/react';

const CoverImage = ({ title, src, slug }) => {
  const image = (
    <AspectRatio ratio={16 / 9}>
      <Image
        style={{ borderRadius: '10px' }}
        src={src}
        alt={`Cover Image for ${title}`}
        objectFit="cover"
        fill
      />
    </AspectRatio>
  );
  return (
    <Box mt={'6'}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default CoverImage;
