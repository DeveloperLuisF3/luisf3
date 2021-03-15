import React, { useEffect } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout/layout";

// Material Ui
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// components
import AppBar from "../components/navbar/AppBar";

// context
import UserState from "../context/Users/UserState";
/*import { loginWithFacebook } from "../firebase/firebase.config";*/

export default function HomePage() {

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

    /*const handleFacebook = () => {
        loginWithFacebook();
    }*/

   
    const handleDarkMode = () => {
        setThemeMode("dark");
    };
    const handleLightMode = () => {
        setThemeMode("light");
    };

    return (
      <ThemeProvider theme={theme}>
        <UserState>
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <AppBar
                    /*handleFacebook={handleFacebook}*/
                    ThemeMode={ThemeMode}
                    DarkMode={handleDarkMode}
                    LightMode={handleLightMode}
                >

                </AppBar>
            </Layout>
        </UserState>
      </ThemeProvider>
    );
}

