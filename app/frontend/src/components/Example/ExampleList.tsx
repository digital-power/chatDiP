import { Example } from "./Example";
import { useTranslation } from "react-i18next";

import styles from "./Example.module.css";
import config from "../../../../backend/approaches/config/config_approaches.json";

type Usecase = (typeof config)[0];

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
    currentUsecase: Usecase;
}

export const ExampleList = ({ onExampleClicked, currentUsecase, useGPT4V }: Props) => {
    const { t } = useTranslation();

    // Ophalen van vragen en filteren van placeholders
    const exampleQuestions = t("example_questions", { returnObjects: true }) as Record<string, Record<string, string>>;

    // Zorg ervoor dat de vragen voor de juiste usecase worden opgehaald
    const examples = Object.values(exampleQuestions[currentUsecase.id] || {}).filter(question => typeof question === "string" && question.trim().length > 0); // Filter lege of niet-relevante strings

    return (
        <ul className={styles.examplesNavList}>
            {examples.map((question, i) => (
                <li key={i}>
                    <Example text={question} value={question} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
