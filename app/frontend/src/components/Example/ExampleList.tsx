import { Example } from "./Example";
import { useTranslation } from "react-i18next";

import styles from "./Example.module.css";

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
    currentUsecase: string;
}

export const ExampleList = ({ onExampleClicked, currentUsecase }: Props) => {
    const { t } = useTranslation();

    // Ophalen van voorbeeldvragen voor de huidige usecase
    const exampleQuestions = t(`approach.${currentUsecase}.example_questions`, {
        returnObjects: true
    }) as Record<string, string>;

    // Filter lege of ongeldige vragen
    const examples = Object.values(exampleQuestions || {}).filter(question => typeof question === "string" && question.trim().length > 0);

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
