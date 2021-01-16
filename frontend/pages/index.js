import React, { useEffect } from "react"
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import List from "../components/navbar/List"
import AppBar from "../components/navbar/AppBar"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import firebase from "../firebase/firebase.config"



const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
})

/*const ThemeModeConfig = (topic) => {
    console.log(topic)
    let ThemeMode = topic
    themeRef.set(ThemeMode)
}*/
/*export async function getStaticProps() {
    const topic = await getThemeData()
    return {
        props: {
            topic,
        },
    }
}*/

export default function HomePage({ topic }) {
    const classes = useStyles()
    console.log(topic)

    const [ThemeMode, setThemeMode] = React.useState(topic || 'light')

    useEffect(() => {
        let database = firebase.database()
        let themeRef = database.ref(`/theme`)
        themeRef.set(ThemeMode)
        console.log(ThemeMode)
    })
    
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
    })

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
    }

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
    )
    const handleDarkMode = () => {
        setThemeMode("dark")
    }
    const handleLightMode = () => {
        setThemeMode("light")
    }

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
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
                <div>Welcome to Next.js!</div>
                <h1>index</h1>
                <h2 className="title">
                Read{" "}
                    <Link href="/services">
                        <a>this page!</a>
                    </Link>
                </h2>
                <Container>
                    <Box my={2}>
                        {[...new Array(12)]
                        .map(
                            () => `
                                Cras mattis consectetur  purus        sit    amet fermentum.
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                            `
                        )
                        .join("\n")}
                    </Box>
                </Container>
            </Layout>
        </ThemeProvider>
    );
}