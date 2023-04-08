import { Avatar as ChakraAvatar } from "@chakra-ui/react"
import { Stack, Heading } from "@chakra-ui/react"

export default function Avatar(props) {
    <Stack direction={"row"} gap={"15px"}>
        <ChakraAvatar name="Anthony Di Biaggio" src="../../public/me.png"/>
        <Heading>
            Anthony Di Biaggio
        </Heading>
    </Stack>
}