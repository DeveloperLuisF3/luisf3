import React, { useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/layout';

// Material Ui
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// components
import AppBar from "../components/navbar/AppBar";

// context 
import UserState from "../context/Users/UserState";

export default function ServicesPage() {
    
    const [ThemeMode, setThemeMode] = React.useState('light');

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
    })

    const handleDarkMode = () => {
        setThemeMode("dark")
    }
    const handleLightMode = () => {
        setThemeMode("light")
    }
    return (
        <ThemeProvider theme={theme}>
            <UserState>
                <Layout>
                    <Head>
                        <title>Services LuisF3</title>
                    </Head>
                    <AppBar
                        ThemeMode={ThemeMode}
                        DarkMode={handleDarkMode}
                        LightMode={handleLightMode}
                    >
                        <div>Welcome to Next.js!</div>
                        <h1>Services</h1>
                        <h2>
                            <Link href="/">
                                <a>Back to home</a>
                            </Link>
                        </h2>
                    </AppBar>
                </Layout>
            </UserState>
        </ThemeProvider>
    )
}