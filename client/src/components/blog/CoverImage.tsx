import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio, Box, useColorModeValue } from '@chakra-ui/react';

export interface CoverImageProps {
  title: string;
  src: string;
  slug?: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ title, src, slug }) => {
  const image = (
    <AspectRatio ratio={16 / 9}>
      <Image
        style={{ borderRadius: '6px' }}
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
        <Link
          as={`/blog/posts/${slug}`}
          href="/blog/posts/[slug]"
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default CoverImage;
