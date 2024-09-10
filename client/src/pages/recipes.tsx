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

export default function Blog({
  recipesById,
  recipeUidsByCategoryUid,
  categories,
}) {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<number | number[]>([]);

  const handleAccordionChange = (index: number | number[]) => {
    setExpandedIndices(index);
  };

  const handleRecipeSidebarClick = (recipeUid: string) => {
    if (selectedRecipe === recipeUid) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe(recipeUid);
    }
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
          mt="3"
          index={expandedIndices}
          onChange={handleAccordionChange}
          allowMultiple
          border="0"
          variant="unstyled"
        >
          {categories.map((category) => (
            <AccordionItem key={category.uid} border="0">
              <h2>
                <AccordionButton
                  fontWeight={600}
                  _hover={{ outline: '1px solid' }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Text size="md">{category.name}</Text>
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
                        onClick={(_) => handleRecipeSidebarClick(recipe.uid)}
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
      <SimpleGrid
        width="100%"
        gap={8}
        p={['32px 8px', null, '8px 32px 32px 260px']}
        minChildWidth={['40vw', null, '200px']}
      >
        {Object.values(recipesById).map((recipe) => (
          <Flex key={recipe.uid} direction="column">
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
              <Heading size="sm">{recipe.name}</Heading>
              <Text>{recipe.source}</Text>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
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

    return {
      props: { recipesById, recipeUidsByCategoryUid, categories },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        recipesById: {},
        recipeUidsByCategoryUid: {},
        categories: [],
        isError: true,
      },
      revalidate: 3600,
    };
  }
};
