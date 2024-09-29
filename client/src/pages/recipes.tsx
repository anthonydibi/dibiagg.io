import {
  Box,
  Text, Flex,
  SimpleGrid,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel, Button, LinkOverlay,
  LinkBox,
  useBreakpointValue,
  Grid,
  GridItem
} from '@chakra-ui/react';
import SEO from '../components/seo';
import {
  getAuthToken,
  getCategories,
  getRecipe,
  getRecipes,
} from '../services/Paprika/PaprikaApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  PutObjectCommandInput, ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { useNavStore } from '../stores/navStore';
import { mapToCategoriesById, mapToRecipeIdByRecipeName, mapToRecipeIdsByCategoryId, mapToRecipesById } from '../services/Paprika/internal/map';
import { InferGetStaticPropsType } from 'next';

export default function Blog({
  recipesById,
  recipeUidsByCategoryUid,
  recipeUidsByRecipeName,
  categoriesByUid,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const search = useSearchParams();
  const searchRecipe = search.get('recipe');
  const selectedRecipe = searchRecipe
    ? recipeUidsByRecipeName[searchRecipe]
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchRecipe]);

  const selectedRecipeObj = selectedRecipe ? recipesById[selectedRecipe] : null;
  const [expandedIndices, setExpandedIndices] = useState<number | number[]>([]);

  const handleAccordionChange = (index: number | number[]) => {
    setExpandedIndices(index);
  };

  const navIsOpen = useNavStore((state) => state.isOpen);
  const toggleNav = useNavStore((state) => state.toggle);
  const sidebarShouldBeVisible = useBreakpointValue([navIsOpen, null, true]);
  const responsiveSidebarStyle = useBreakpointValue([
    {
      width: '100%',
      padding: '3.25rem .2rem .2rem .2rem',
      translateX: '-100%',
    },
    null,
    {
      width: '248px',
      padding: '.5rem',
      translateX: '0',
    },
  ]);
  const sidebarStyle: MotionStyle = {
    display: 'flex',
    position: 'fixed',
    borderLeft: '4px solid var(--accent)',
    top: 0,
    left: 0,
    zIndex: 1,
    height: '100%',
    background: 'var(--off)',
    overflowY: 'auto',
    boxShadow: 'var(--chakra-shadows-lg)',
    flexDirection: 'column',
    ...responsiveSidebarStyle,
  };

  return (
    <>
      <SEO
        title="Recipes"
        siteTitle="dibiagg.io"
        description="Anthony Di Biaggio's recipes"
      />
      <motion.div
        style={sidebarStyle}
        animate={{ translateX: sidebarShouldBeVisible ? 0 : '-100%' }}
        initial={false}
        transition={{ ease: 'easeInOut' }}
      >
        <Accordion
          mt={2}
          allowToggle
          index={expandedIndices}
          onChange={handleAccordionChange}
          border="0"
          variant="unstyled"
        >
          {Object.values(categoriesByUid).map((category) => (
            <AccordionItem position="relative" key={category.uid} border="0">
              <h2>
                <AccordionButton fontWeight={600}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      width="max-content"
                      fontWeight={400}
                      size="md"
                      position="relative"
                    >
                      {category.name}
                      <AnimatePresence>
                        {selectedRecipe && recipeUidsByCategoryUid[category.uid].includes(
                          selectedRecipe,
                        ) && (
                          <Box
                            as={motion.div}
                            initial={{ width: '0' }}
                            animate={{ width: '110%' }}
                            exit={{ width: '0' }}
                            transition={{ ease: 'ease-in-out' }}
                            position="absolute"
                            bottom="5%"
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
                        onClick={() => {
                          toggleNav();
                        }}
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
      </motion.div>
      {selectedRecipe && selectedRecipeObj ? (
        <Flex p={['8px 2px', null, '8px 8px 8px 256px']} justifyContent="center">
          <Grid boxShadow="md" p={[0, null, '8px']} borderRadius="6px"
            templateAreas={[
              `"photo" "name" "ingredients" "directions"`,
              null,
              '"name photo" "directions ingredients"',
            ]}
            templateColumns={['1fr', null, '1fr minmax(200px, 1fr)']}
            maxW="6xl"
          >
            <GridItem area="name" boxShadow="md">
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="start"
                borderWidth={['0 2px 2px 2px', null, '2px 0 2px 2px']}
                borderStyle="solid"
                borderColor="accent"
              >
                <Flex direction="column" gap="8px" p=".625rem">
                  <Heading textAlign="left" size="lg">
                    {selectedRecipeObj.name}
                  </Heading>
                  <Flex gap={1} flexWrap="wrap">
                    {selectedRecipeObj.categories.map((category) => (
                      <Text
                        fontSize="md"
                        p={1}
                        border="0.5px solid"
                        lineHeight="12px"
                        key={category}
                        color="gray.600"
                      >
                        {categoriesByUid[category].name}
                      </Text>
                    ))}
                  </Flex>
                  {selectedRecipeObj.servings && (
                    <Text textAlign="left">
                      <b>Servings</b>{' '}
                      {selectedRecipeObj.servings.replace(
                        /[s]ervings?:?|yields?:?/gi,
                        '',
                      )}
                    </Text>
                  )}
                  {selectedRecipeObj.total_time && (
                    <Text textAlign="left">
                      <b>Total time</b> {selectedRecipeObj.total_time}
                    </Text>
                  )}
                  {selectedRecipeObj.prep_time && (
                    <Text textAlign="left" ml={selectedRecipeObj.total_time ? 2 : 0}>
                      <b>Prep time</b> {selectedRecipeObj.prep_time}
                    </Text>
                  )}
                  {selectedRecipeObj.cook_time && (
                    <Text textAlign="left" ml={selectedRecipeObj.total_time ? 2 : 0}>
                      <b>Cook time</b> {selectedRecipeObj.cook_time}
                    </Text>
                  )}
                  <Text textAlign="left">
                    <b>From</b> {selectedRecipeObj.source}
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem height="100%" area="photo" boxShadow="md">
              <Flex
                position="relative"
                aspectRatio={1 / 1}
                w="100%"
                borderWidth={['2px 2px 0 2px', null, '2px 2px 2px 0']}
                borderStyle="solid"
                borderColor="accent"
              >
                <Image
                  src={selectedRecipeObj.image_url}
                  alt={selectedRecipeObj.name}
                  unoptimized
                  style={{
                    objectFit: 'cover',
                  }}
                  fill
                />
              </Flex>
            </GridItem>
            <GridItem
              area="directions"
              borderTop="8px solid var(--accent)"
              mt={2}
              mr={[0, null, 2]}
            >
              <Heading size="md" mt={1} mx={[2, null, 0]}>
                Directions
              </Heading>
              <Box p={[2, null, 0]} pt={[1, null, 2]}>
                <Text whiteSpace="pre-wrap" mx={[2, null, 0]}>
                  {selectedRecipeObj.directions}
                </Text>
              </Box>
            </GridItem>
            <GridItem
              area="ingredients"
              borderTop="8px solid var(--accent)"
              mt={2}
              ml={[0, null, 2]}
              mb={[0, null, 4]}
            >
              <Heading size="md" mt={1} mx={[2, null, 0]}>
                Ingredients
              </Heading>
              <Box pl={4} pt={[1, null, 2]}>
                <Box as="ul" mx={[2, null, 0]}>
                  {selectedRecipeObj.ingredients.split('\n').map((ingredient) => (
                    <li key={ingredient}>
                      <Text>{ingredient}</Text>
                    </li>
                  ))}
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      ) : (
        <SimpleGrid
          width="100%"
          gap={4}
          p={['8px', null, '16px 16px 16px 264px']}
          minChildWidth={['40vw', null, '200px']}
        >
          {Object.values(recipesById).map((recipe) => (
            <LinkBox
              as={'article'}
              display="flex"
              flex={1}
              key={recipe.uid}
              height="100%"
            >
              <Flex
                _hover={{
                  transform: 'scale(1.03) translate3d(-4px, -4px, 0)',
                  boxShadow: '4px 4px 0px var(--accent)',
                }}
                transition="all 300ms"
                key={recipe.uid}
                direction="column"
                width="100%"
              >
                <Box aspectRatio={1 / 1} position="relative">
                  <Image src={recipe.image_url} style={{
                  objectFit: 'cover',
                }} alt={recipe.name} fill />
                </Box>
                <Flex
                  direction="column"
                  flex={1}
                  p={2}
                  justifyContent="space-between"
                  borderWidth="0 1px 1px 1px"
                  borderStyle="solid"
                  borderColor="accent"
                >
                  <Flex direction="column" gap={0.5}>
                    <LinkOverlay
                      as={NextLink}
                      href={`/recipes?recipe=${encodeURIComponent(
                        recipe.name,
                      )}`}
                      shallow
                    >
                      <Heading size="sm" fontWeight={500}>
                        {recipe.name}
                      </Heading>
                    </LinkOverlay>
                    <Flex gap={1} flexWrap="wrap">
                      {recipe.categories.map((category) => (
                        <Text
                          fontSize="sm"
                          p={1}
                          border="0.5px solid"
                          lineHeight="12px"
                          key={category}
                          color="gray.600"
                        >
                          {categoriesByUid[category].name}
                        </Text>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </LinkBox>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export const getStaticProps = async () => {
  if (!process.env.PAPRIKA_EMAIL || !process.env.PAPRIKA_PW) {
    throw new Error('Missing Paprika credentials');
  }

  if (
    !process.env.AWS_S3_ACCESS_KEY_ID ||
    !process.env.AWS_S3_SECRET_ACCESS_KEY
  ) {
    throw new Error('Missing AWS credentials');
  }

  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
  });

  let categories: Category[] = [];
  let fullRecipes: FullRecipe[] = [];
  let pulledFreshRecipes = true;
  let uploadedImages = false;

  try {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Development mode, skipping API calls');
    }

    const tokenData = await getAuthToken(
      process.env.PAPRIKA_EMAIL,
      process.env.PAPRIKA_PW,
    );
    const token = tokenData.result.token;

    const recipesData = await getRecipes(token);
    const recipes = recipesData.result;

    const categoriesData = await getCategories(token);
    categories = categoriesData.result;

    const fullRecipesData = await Promise.all(
      recipes.map(async (recipe) => getRecipe(token, recipe.uid)),
    );
    fullRecipes = fullRecipesData.map(result => result.result);
  } catch (e) {
    console.error(e);
    pulledFreshRecipes = false;

    const getObjectParams = {
      Bucket: 'dibiaggdotio-assets',
      Key: 'recipes.json',
    };
    const getObjectCommand = new GetObjectCommand(getObjectParams);
    const getObjectResponse = await s3.send(getObjectCommand);
    const recipeJsonString = await getObjectResponse.Body?.transformToString();
    if (!recipeJsonString) {
      throw new Error('No data found in S3');
    }

    const recipeData = JSON.parse(recipeJsonString);

    if (!recipeData.categories || !recipeData.fullRecipes) {
      throw new Error('No data found in S3');
    }

    categories = recipeData.categories;
    fullRecipes = recipeData.fullRecipes;
  }

  const allRecipeImages = await s3.send(
    new ListObjectsV2Command({
      Bucket: 'dibiaggdotio-assets',
      Prefix: 'images/recipe/',
    }),
  );
  const imageSet = new Set(
    allRecipeImages.Contents?.map((content) => content.Key),
  );

  // try to upload images since image links from the API expire
  fullRecipes.forEach(async (recipe) => {
    const imageKey = `images/recipe/recipe-${recipe.uid}.jpg`;
    const imageUrl = `https://d1detxxicj4679.cloudfront.net/${imageKey}`;
    const imageExists = imageSet.has(imageKey);

    if (!imageExists) {
      try {
        const imageRes = await fetch(recipe.image_url);
        if(!imageRes.ok) {
          throw new Error('Failed to fetch image');
        }

        const imageBuffer = await imageRes.arrayBuffer();

        const putImageParams: PutObjectCommandInput = {
          Bucket: 'dibiaggdotio-assets',
          Key: imageKey,
          // @ts-ignore
          Body: imageBuffer,
        };

        const putImageCommand = new PutObjectCommand(putImageParams);
        await s3.send(putImageCommand);

        uploadedImages = true;
        recipe.image_url = imageUrl;
      } catch (e) {
        console.error(e);
      }
    } else {
      recipe.image_url = imageUrl;
    }
  });

  if (pulledFreshRecipes || uploadedImages) {
    try {
      // try to upload recipe data to S3 in case we get rate-limited
      const recipeData = {
        categories,
        fullRecipes,
      };

      const putObjectParams: PutObjectCommandInput = {
        Bucket: 'dibiaggdotio-assets',
        Key: 'recipes.json',
        Body: JSON.stringify(recipeData),
        ContentType: 'application/json',
      };

      const putObjectCommand = new PutObjectCommand(putObjectParams);
      await s3.send(putObjectCommand);
    } catch (e) {
      console.error(e);
    }
  }

  const recipesById = mapToRecipesById(fullRecipes);

  const recipeUidsByCategoryUid = mapToRecipeIdsByCategoryId(fullRecipes);

  const recipeUidsByRecipeName = mapToRecipeIdByRecipeName(fullRecipes);

  const categoriesByUid = mapToCategoriesById(categories);

  return {
    props: {
      recipesById,
      recipeUidsByCategoryUid,
      recipeUidsByRecipeName,
      categoriesByUid,
    },
    revalidate: 3600 * 24,
  };
};
