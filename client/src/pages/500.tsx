import { FC } from "react";
import ErrorPage from "../components/ErrorPage";

const Custom404Page: FC = () => {
    return (
        <ErrorPage statusCode={500} flavorText={'Something bad happened, but it\'s not your fault.'} />
    );
};

export default Custom404Page;