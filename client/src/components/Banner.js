import {
  Box,
  Heading,
  Container,
  Stack,
  Square,
  Icon,
  Button,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'

export default function Banner(props) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <Box align="center" bg="accent" w="100%" borderBottom="1px solid">
        <Container
          align="center"
          maxW="container.lg"
          py={{ base: '4', md: '1' }}
          position="relative"
        >
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: '3', md: '2' }}
            justify="space-between"
          >
            <Stack
              spacing="4"
              direction={{ base: 'column', md: 'row' }}
              align="center"
            >
              {!isMobile && (
                <Square size="12" bg="bg-subtle" borderRadius="md">
                  <Icon color="white" as={FiInfo} boxSize="6" />
                </Square>
              )}
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: '0.5', md: '1.5' }}
                align={'center'}
              >
                <Heading color="white" size={'sm'} whiteSpace={'nowrap'}>
                  {props.header}
                </Heading>
                <Text color="white" whiteSpace={'nowrap'} m="0">
                  {props.action}
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={{ base: '3', sm: '2' }}
              align={{ base: 'stretch', sm: 'center' }}
            >
              <Button
                variant="interact"
                rounded="none"
                borderColor="white"
                width="full"
                onClick={props.onClick}
              >
                <Box mr="2" color="white">
                  {props.buttonIcon}
                </Box>
                <Text color="white">{props.buttonText}</Text>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
