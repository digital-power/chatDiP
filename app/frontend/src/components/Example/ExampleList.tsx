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
