import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../context/Users/UserContext";
import clsx from "clsx";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CallIcon from '@material-ui/icons/Call';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Brightness4, Brightness2 } from '@material-ui/icons';
import Avatar from "@material-ui/core/Avatar";

// components
import List from "../navbar/List";

// firebase
import firebase, { logOut, deleteUser } from "../../firebase/users/firebaseLogin";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	navbar: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreenl,
		}),
		backgroundColor: theme.palette.backgroundNavbar.main,
		color: theme.palette.text.primary,
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	title: {
		flexGrow: 1,
		alignSelf: "flex-center",
	},
	tel: {
		color: theme.palette.text.primary,
	},
	wrapperAvatar: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	telMobil: {
		marginLeft: "1%",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
}));

export default function appBar({ children, HandleLightMode, HandleDarkMode }) {
	let {
		login,
		ThemeMode,
		HandleLogin,
		HandleSesion
	} = useContext(UserContext);
	console.log(ThemeMode);
	let classes = useStyles();
	let theme = useTheme();
	let [open, setOpen] = React.useState(false);
	let [anchorEl, setAnchorEl] = React.useState(null);
	let [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	useEffect(() => {
		let unsubscribe = firebase.auth().onAuthStateChanged((u) => {
			try {
				if (u) {
					localStorage.setItem('user', JSON.stringify(u));
					HandleSesion(u);
				} else {
					console.log("luisf3 =>" + + u);
					HandleSesion(u);
				}
			} catch (error) {
				console.log(error);
			}
		})
		return () => unsubscribe();
	}, [login, ThemeMode]);

	let HandlePopupLogin = (e) => {
		console.log(e);
	};

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={login ? logOut : HandleLogin}
			>
				{login ? "Cerrar Sesión" : "Iniciar Sesión"}
			</MenuItem>
			{login ?
				<MenuItem
					onClick={deleteUser}
				>
					Cancelar Suscripción
                </MenuItem>
				:
				<MenuItem>
					Bienvenida(o) A Mi App!
                </MenuItem>
			}
			<MenuItem>
				{login ? login.displayName : "Inicia Sesión Por Favor!"}
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					edge="start"
					aria-label="call"
					className={classes.telMobil}
				>
					<a className={classes.tel} href="tel:+525534296773">
						<CallIcon />
					</a>
				</IconButton>
				<p>CallMe</p>
			</MenuItem>
			<MenuItem>
				{ThemeMode === "light" ? (
					<IconButton onClick={login ? HandleDarkMode : HandlePopupLogin}>
						<Brightness2 />
					</IconButton>
				) : (
					<IconButton onClick={login ? HandleLightMode : HandlePopupLogin}>
						<Brightness4 />
					</IconButton>
				)}
				<p>Theme</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.navbar}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						className={classes.title}
						variant="h6"
						noWrap
					>
						Developer LuisF3
                    </Typography>
					<div className={classes.navbar} />
					<div className={classes.sectionDesktop}>
						<IconButton
							edge="start"
							aria-label="call"
						>
							<a className={classes.tel} href="tel:+525534296773">
								<CallIcon />
							</a>
						</IconButton>
						{ThemeMode === "light" ? (
							<IconButton
								onClick={login ? HandleDarkMode : HandlePopupLogin}
							>
								<Brightness2 />
							</IconButton>
						) : (
							<IconButton
								onClick={login ? HandleLightMode : HandlePopupLogin}
							>
								<Brightness4 />
							</IconButton>
						)}
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.wrapperAvatar}>
						<Avatar
							alt="You Photo"
							src={login ? login.photoURL : "images/iconasluisf3.png"}
						/>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List />
			</Drawer>
			{renderMobileMenu}
			{renderMenu}
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div>{children}</div>
			</main>
		</div>
	);
};
