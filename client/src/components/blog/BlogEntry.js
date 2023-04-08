import { Heading, Stack, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useClickable } from "@chakra-ui/clickable";
import DateFormatter from "./DateFormatter";

const Clickable = (props) => {
    const clickable = useClickable(props)
    return <chakra.button display="inline-flex" {...clickable} />
}

export const BlogEntry = (props) => {

    const router = useRouter();

    return (
        <>
            <Clickable as={Stack} w={"100%"} p={"8"} border="1px" my="4" textAlign={"start"} onClick={() => router.push(`/posts/${props.post.slug}`)}>
                <Heading display={"block"}>
                    {props.post.title}
                </Heading>
                <DateFormatter dateString={props.post.date} />
            </Clickable>
        </>
    );
}