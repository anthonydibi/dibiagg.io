import { Heading, Stack, LinkOverlay, LinkBox } from "@chakra-ui/react";
import NextLink from "next/link";
import DateFormatter from "./DateFormatter";

export const BlogEntry = (props) => {

    return (
        <>
            <LinkBox as={'article'} direction={"column"} w={"100%"} p={"8"} border="1px" textAlign={"start"}>
                <LinkOverlay as={NextLink} href={`/posts/${props.post.slug}`}>
                    <Heading display={"block"}>
                        {props.post.title}
                    </Heading>
                </LinkOverlay>
                <DateFormatter dateString={props.post.date} />
            </LinkBox>
        </>
    );
}