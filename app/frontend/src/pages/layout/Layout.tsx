import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Layout.module.css";
import { useLogin } from "../../authConfig";
import { LoginButton } from "../../components/LoginButton";
import config from "../../../../backend/approaches/config/config_approaches.json";

const Layout = () => {
    const configArray = Object.values(config);
    const params = useParams();
    const location = useLocation();
    const usecase_id = params.usecase_id ?? "hrdocs";
    const currentUsecase = configArray.find(usecase => usecase_id == usecase.id);
    const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to={location.pathname} className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>AI Document Explorer</h3>
                    </Link>
                    <Link to="https://digital-power.com/en/solutions/ai-document-explorer/" target="_blank" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerRightText}>How does it work?</h3>
                    </Link>
                    {useLogin && <LoginButton />}
                </div>
            </header>

            <Outlet context={[isConfigPanelOpen, setIsConfigPanelOpen, currentUsecase]} />
        </div>
    );
};

export default Layout;
