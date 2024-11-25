import { Example } from "./Example";
import { useTranslation } from "react-i18next";

import styles from "./Example.module.css";
import config from "../../../../backend/approaches/config/config_approaches.json";
import example_questions from "../../../../backend/approaches/config/config_approaches.json";
const DEFAULT_EXAMPLES: string[] = [
    "Wat staat er in het financieel jaarverslag van de RvA?",
    "Hoe zorgt de RvA dat gegevens veilig zijn?",
    "Wat doet de rva om duurzaamheid te stimuleren?"
]; // pak default uit json

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
    const examples = Object.values(exampleQuestions[currentUsecase.id] || {})
        .filter((question) => typeof question === "string" && question.trim().length > 0); // Filter lege of niet-relevante strings
    
    console.log("Gevonden vragen:", examples);

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