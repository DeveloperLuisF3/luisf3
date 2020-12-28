import React from "react"
import Head from 'next/head'
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import styles from '../../styles/layout/layout.module.css'
import List from '../navbar/List'
import AppBar from '../navbar/AppBar'

export const siteTitle = 'Developer LuisF3'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
});

export default function Layout({ children }) {
    const classes = useStyles();
    
    const [ThemeMode, setThemeMode] = React.useState("light");
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List />
        </div>
    );

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
        },
    });

    const handleDarkMode = () => {
        document.querySelector("body").style.backgroundColor = "#121212";
        setThemeMode("dark");
    };
    const handleLightMode = () => {
        document.querySelector("body").style.backgroundColor = "#ffffff";
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
                        name="luisf3"
                        content="Learn how to build a personal website using Next.js"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.now.sh/${encodeURI(
                            siteTitle
                        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <AppBar
                            toggleDrawer={toggleDrawer}
                            ThemeMode={ThemeMode}
                            DarkMode={handleDarkMode}
                            LightMode={handleLightMode}
                        />
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
                <div>{children}</div>
            </div>
        </ThemeProvider>
    );
}