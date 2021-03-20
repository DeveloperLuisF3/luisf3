import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../context/Users/UserContext"
import Head from "next/head";

// components
import AppBar from "../navbar/AppBar";

// Material Ui
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

/* ThemeMode
import theme from "../../theme/theme"; */

// styles
import styles from "../../styles/layout/layout.module.css";

// firebase
import { updateTheme, themeRef } from "../../firebase/users/firebaseTheme";

// variables
export let siteTitle = "Developer LuisF3";

let Layout = ({ children }) => {
	let { ThemeMode, login, HandleTheme } = useContext(UserContext);
	console.log(ThemeMode);
	console.log(login);

	useEffect(() => {
		if (login) {
			let unsubscribe = themeRef.doc(login.uid).onSnapshot((doc) => {
				console.log("Current data: ", doc.data().themeObject.ThemeMode);
				let topic = doc.data().themeObject.ThemeMode;
				HandleTheme(topic);
			})
			return () => unsubscribe();
		}
		else { console.log("not user") };
	}, [ThemeMode, login]);

	let theme = createMuiTheme({
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

	let HandleDarkMode = () => {
		updateTheme("dark");
	};
	let HandleLightMode = () => {
		updateTheme("light");
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.container}>
				<Head>
					<link rel="icon" href="/images/iconasluisf3.png" type="image/png" />
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
					// ThemeMode={ThemeMode}
					HandleDarkMode={HandleDarkMode}
					HandleLightMode={HandleLightMode}
				>
					<div>{children}</div>
				</AppBar>
			</div>
		</ThemeProvider>
	);
};

export default Layout;
