import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme = (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storedTheme;
  });

  const nextTheme = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  function applyTheme(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a href="#" className={styles.menuLink} aria-label="Home" title="Ir para Home">
        <HouseIcon />
      </a>
      <a href="#" className={styles.menuLink} aria-label="History" title="Ver Histórico">
        <HistoryIcon />
      </a>
      <a href="#" className={styles.menuLink} aria-label="Settings" title="Ir para Configurações">
        <SettingsIcon />
      </a>
      <a className={styles.menuLink} aria-label="Toggle theme" title="Alternar tema" onClick={applyTheme}>
        {nextTheme[theme]}
      </a>
    </nav>
  );
}
