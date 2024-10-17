import { Example } from "./Example";
import { useTranslation } from "react-i18next";

import styles from "./Example.module.css";
import config from "../../../../backend/approaches/config/config_approaches.json";

const DEFAULT_EXAMPLES: string[] = [
    "Wat staat er in het financieel jaarverslag van de RvA?",
    "Hoe zorgt de RvA dat gegevens veilig zijn?",
    "Wat doet de rva om duurzaamheid te stimuleren?"
];

type Usecase = (typeof config)[0];

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
    currentUsecase: Usecase;
}

export const ExampleList = ({ onExampleClicked, currentUsecase, useGPT4V }: Props) => {
    const { t } = useTranslation();
    const examples: string[] = currentUsecase?.example_questions ?? DEFAULT_EXAMPLES;

    const DEFAULT_EXAMPLES: string[] = [t("defaultExamples.1"), t("defaultExamples.2"), t("defaultExamples.3")];
    const GPT4V_EXAMPLES: string[] = [t("gpt4vExamples.1"), t("gpt4vExamples.2"), t("gpt4vExamples.3")];

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
