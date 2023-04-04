import Image from "next/image"
import { Box } from "@chakra-ui/react"

export const ChakraNextImage = (props) => {
    const { src, alt, ...rest } = props
    return (
        <Box
            position="relative"
            rounded = "true"
            {...rest}
        >
            <Image
                objectFit="cover"
                layout="fill"
                src={src}
                alt={alt}
                style={{borderRadius: "50%"}}
            />
        </Box>
    )
}