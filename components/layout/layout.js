import React from "react";
import Head from "next/head";

// components
import AppBar from "../navbar/AppBar";

// Material Ui
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// styles
import styles from "../../styles/layout/layout.module.css";

// variables
export let siteTitle = "Developer LuisF3";

let Layout = ({ children }) => {
    const [ThemeMode, setThemeMode] = React.useState("light");

    const theme = createMuiTheme({
        palette: {
            type: ThemeMode,
            primary: {
                light: ThemeMode === "light" ? green[200] : green[100],
                main: ThemeMode === "light" ? green[500] : green[200],
                dark: ThemeMode === "light" ? green[800] : green[300],
            },
            secondary: {
                light: ThemeMode === "light" ? purple[200] : purple[100],
                main: ThemeMode === "light" ? purple[500] : purple[200],
                dark: ThemeMode === "light" ? purple[800] : purple[300],
            },
            backgroundContainer: {
                main: ThemeMode === "light" ? '#ffffff' : '#121212',
            },
            backgroundNavbar: {
                main: ThemeMode === "light" ? green[500] : '#121212',
            },
        },
    });

    const handleDarkMode = () => {
        setThemeMode("dark");
    };
    const handleLightMode = () => {
        setThemeMode("light");
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/images/iconluisf3.png" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <meta
                        name="description"
                        content="Learn how to build a personal website using Next.js"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.now.sh/${encodeURI(
                            siteTitle
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta
                        name="og:title"
                        content={siteTitle}
                    />
                    <meta
                        name="twitter:card" content="summary_large_image"
                    />
                </Head>
                <AppBar
                    ThemeMode={ThemeMode}
                    DarkMode={handleDarkMode}
                    LightMode={handleLightMode}
                >
                    <div>{children}</div>
                </AppBar>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
