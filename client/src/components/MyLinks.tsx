import { Box, Button, Flex, Link, useToast } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FaBriefcase, FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdChatBubble, MdEmail } from 'react-icons/md';
import NextLink from 'next/link';
import { IconType } from 'react-icons/lib';
import { BiFoodMenu } from 'react-icons/bi';

type Props = {};

const MyLinks = (props: Props) => {
  const toast = useToast();

  const copyToClipboardAndShowToast = async (
    contactType: string,
    contactLink: string,
  ) => {
    if (window.isSecureContext) {
      await navigator.clipboard.writeText(contactLink);
      toast({
        title: 'Copied to clipboard!',
        description: `You can now paste my ${contactType}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Copy to clipboard failed.',
        description:
          'Sorry! Your browser does not support clipboard modification, or you are not visiting my site from a secure context :(',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const LinksConfig: {
    [linkKey: string]: {
      display: string;
      icon: IconType;
      onClick?: () => void;
      href?: string;
      external?: boolean;
    };
  } = {
    blog: {
      display: 'Blog',
      icon: MdChatBubble,
      href: '/blog',
    },
    recipes: {
      display: 'Recipes',
      icon: BiFoodMenu,
      href: '/recipes',
    },
    discord: {
      display: 'Discord',
      icon: FaDiscord,
      onClick: () =>
        copyToClipboardAndShowToast('Discord username', 'boat boat#3913'),
    },
    linkedin: {
      display: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/anthony-di-biaggio-95524916b/',
    },
    email: {
      display: 'Email',
      icon: MdEmail,
      href: 'mailto:anthony@dibiagg.io',
    },
    github: {
      display: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/anthonydibi',
    },
    resume: {
      display: 'Resume',
      icon: FaBriefcase,
      href: '/Anthony Di Biaggio Resume.pdf',
      external: true,
    },
  };

  return (
    <>
      {Object.entries(LinksConfig).map(([key, value]) => {
        const Icon = value.icon;
        return value.href ? (
          value.href.startsWith('/') ? (
            <Button
              minW="min-content"
              as={NextLink}
              href={value.href}
              variant="grow"
              target={value.external ? '_blank' : undefined}
            >
              <Flex gap={1}>
                {value.display} <Icon color="var(--accent)" />
              </Flex>
            </Button>
          ) : (
            <Button
              minW="min-content"
              as={Link}
              href={value.href}
              variant="grow"
              isExternal
            >
              <Flex gap={1}>
                {value.display} <Icon color="var(--accent)" />
              </Flex>
            </Button>
          )
        ) : (
          <Button minW="min-content" onClick={value.onClick} variant="grow">
            <Flex gap={1}>
              {value.display} <Icon color="var(--accent)" />
            </Flex>
          </Button>
        );
      })}
    </>
  );
};

export default MyLinks;
