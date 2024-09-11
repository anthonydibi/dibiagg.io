import {
  Box,
  Text,
  Container,
  Flex,
  SimpleGrid,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  Button,
  ExpandedIndex,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { getAllPosts } from '../services/BlogApi';
import SEO from '../components/seo';
import BlogEntry from '../components/blog/BlogEntry';
import {
  getAuthToken,
  getCategories,
  getRecipe,
  getRecipes,
} from '../services/Paprika/PaprikaApi';
import Image from 'next/image';
import { useState } from 'react';
import { UnderlinedHeading } from '../components/UnderlinedHeading';
import { AnimatePresence, motion } from 'framer-motion';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Blog({
  recipesById,
  recipeUidsByCategoryUid,
  categories,
  recipeUidsByRecipeName,
}) {
  const search = useSearchParams();
  const searchRecipe = search.get('recipe');
  const selectedRecipe = searchRecipe
    ? recipeUidsByRecipeName[searchRecipe]
    : null;
  const [expandedIndices, setExpandedIndices] = useState<number | number[]>([]);

  const handleAccordionChange = (index: number | number[]) => {
    setExpandedIndices(index);
  };

  return (
    <>
      <SEO
        title="Recipes"
        siteTitle="dibiagg.io"
        description="Anthony Di Biaggio's recipes"
      />
      <Flex
        display={['none', null, 'flex']}
        borderRight="2px solid"
        overflowY="scroll"
        p={4}
        direction="column"
        position="fixed"
        top="0"
        width="248px"
        height="100%"
      >
        <UnderlinedHeading size="md" underlineColor="accent">
          CATEGORIES
        </UnderlinedHeading>
        <Accordion
          allowToggle
          mt="3"
          index={expandedIndices}
          onChange={handleAccordionChange}
          border="0"
          variant="unstyled"
        >
          {categories.map((category) => (
            <AccordionItem position="relative" key={category.uid} border="0">
              <h2>
                <AccordionButton fontWeight={600}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text width="max-content" size="md" position="relative">
                      {category.name}
                      <AnimatePresence>
                        {recipeUidsByCategoryUid[category.uid].includes(
                          selectedRecipe,
                        ) && (
                          <Box
                            as={motion.div}
                            initial={{ width: '0' }}
                            animate={{ width: '110%' }}
                            exit={{ width: '0' }}
                            transition={{ ease: 'ease-in-out' }}
                            position="absolute"
                            bottom="10%"
                            bg="accent"
                            width="110%"
                            height="4px"
                          />
                        )}
                      </AnimatePresence>
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} ml={2}>
                <Flex direction="column" gap={4} mt={2} alignItems="start">
                  {recipeUidsByCategoryUid[category.uid].map((recipeUid) => {
                    const recipe = recipesById[recipeUid];
                    return (
                      <Button
                        key={recipeUid}
                        as={NextLink}
                        href={
                          selectedRecipe === recipe.uid
                            ? '/recipes'
                            : `/recipes?recipe=${encodeURIComponent(
                                recipe.name,
                              )}`
                        }
                        shallow
                        color="unset"
                        textDecoration={
                          selectedRecipe === recipe.uid
                            ? 'underline'
                            : undefined
                        }
                        variant="link"
                        fontWeight={400}
                        whiteSpace="normal"
                        textAlign="start"
                      >
                        <Text>{recipe.name}</Text>
                      </Button>
                    );
                  })}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
      {!selectedRecipe ? (
        <SimpleGrid
          width="100%"
          gap={8}
          p={['32px 8px', null, '8px 32px 32px 260px']}
          minChildWidth={['40vw', null, '200px']}
        >
          {Object.values(recipesById).map((recipe) => (
            <LinkBox as={'article'} key={recipe.uid}>
              <Flex
                _hover={{
                  transform: 'scale(1.03) translate3d(-4px, -4px, 0)',
                  boxShadow: '4px 4px 0px var(--accent)',
                }}
                transition="all 300ms"
                key={recipe.uid}
                direction="column"
              >
                <Box aspectRatio={1 / 1} position="relative">
                  <Image src={recipe.photo_url} alt={recipe.name} fill />
                </Box>
                <Flex
                  direction="column"
                  flex={1}
                  p={2}
                  justifyContent="space-between"
                  borderWidth="0 1px 1px 1px"
                  borderStyle="solid"
                  borderColor="orange.300"
                >
                  <LinkOverlay
                    as={NextLink}
                    href={`/recipes?recipe=${encodeURIComponent(recipe.name)}`}
                    shallow
                  >
                    <Heading size="sm">{recipe.name}</Heading>
                  </LinkOverlay>
                  <Text color={'orange.400'}>{recipe.source}</Text>
                </Flex>
              </Flex>
            </LinkBox>
          ))}
        </SimpleGrid>
      ) : (
        <Container
          p={['32px 8px', null, '8px 32px 32px 260px']}
          maxW="100%"
          minH="100vh"
        >
          help
        </Container>
      )}
    </>
  );
}

export const getStaticProps = async () => {
  if (!process.env.PAPRIKA_EMAIL || !process.env.PAPRIKA_PW) {
    throw new Error('Missing Paprika credentials');
  }

  try {
    const tokenRes = await getAuthToken(
      process.env.PAPRIKA_EMAIL,
      process.env.PAPRIKA_PW,
    );
    const tokenData = await tokenRes.json();
    const token = tokenData.result.token;

    const categoriesRes = getCategories(token);

    const recipesRes = await getRecipes(token);
    const recipes = (await recipesRes.json()).result;

    const fullRecipeReses = await Promise.all(
      recipes.map(async (recipe) => getRecipe(token, recipe.uid)),
    );

    const fullRecipeResults = await Promise.all(
      fullRecipeReses.map((res) => res.json()),
    );
    const fullRecipes = fullRecipeResults.map((result) => result.result);

    const recipesById = fullRecipes.reduce((acc, recipe) => {
      acc[recipe.uid] = recipe;
      return acc;
    }, {});

    const categoriesData = await categoriesRes;
    const categories = (await categoriesData.json()).result;

    const recipeUidsByCategoryUid = fullRecipes.reduce((acc, recipe) => {
      recipe.categories?.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(recipe.uid);
      });

      return acc;
    }, {});

    const recipeUidsByRecipeName = fullRecipes.reduce((acc, recipe) => {
      acc[recipe.name] = recipe.uid;
      return acc;
    }, {});

    return {
      props: {
        recipesById,
        recipeUidsByCategoryUid,
        categories,
        recipeUidsByRecipeName,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        recipesById: {},
        recipeUidsByCategoryUid: {},
        categories: [],
        recipeUidsByRecipeName: {},
        isError: true,
      },
      revalidate: 3600,
    };
  }
};
