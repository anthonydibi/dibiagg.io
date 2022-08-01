
import { IconButton, useToast } from "@chakra-ui/react";
import { FaDiscord, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

export default function ContactButtons(){

    const toast = useToast();

    const copyToClipboardAndToast = (contact, copyValue) => {
        if(window.isSecureContext){
            navigator.clipboard.writeText(copyValue);
            toast({
                title: "Copied to clipboard!",
                description: `You can now paste my ${contact}.`,
                status: "success",
                duration: 5000,
                isClosable: true
            });
        }
        else{
            toast({
                title: "Copy to clipboard failed.",
                description: "Sorry! Your browser does not support clipboard modification, or you are not visiting my site from a secure context :(",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    return (
        <>
            <IconButton aria-label="discord" size="md" variant="interact" icon={<FaDiscord />} onClick={() => { copyToClipboardAndToast("Discord username", "boat boat#3913") }} rounded="none">
            </IconButton>
            <IconButton aria-label="linkedin" size="md" variant="interact" icon={<FaLinkedin />} onClick={() => { window.open("https://www.linkedin.com/in/anthony-di-biaggio-95524916b/") }} rounded="none">
            </IconButton>
            <IconButton aria-label="email" size="md" variant="interact" icon={<MdEmail />} onClick={() => { copyToClipboardAndToast("e-mail", "anthony@dibiagg.io") }} rounded="none">
            </IconButton>
            <IconButton aria-label="github" size="md" variant="interact" icon={<FaGithub />} onClick={() => { window.open("https://github.com/anthonydibi") }} rounded="none">
            </IconButton>
        </>
    );
}