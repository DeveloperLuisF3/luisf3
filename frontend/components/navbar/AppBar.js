import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import CallIcon from "@material-ui/icons/Call"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreIcon from "@material-ui/icons/MoreVert"
import { Brightness4, Brightness2 } from "@material-ui/icons"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"

const anchor = "left"

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        minHeight: 128,
        alignItems: "flex-start",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: "flex-end",
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
}))

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined })
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}

export default function appBar({props, ThemeMode, DarkMode, LightMode, toggleDrawer,}) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = "primary-search-account-menu";
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton edge="start" aria-label="call">
                    <a href="tel:+525534296773">
                        <CallIcon />
                    </a>
                </IconButton>
                <p>CallMe</p>
            </MenuItem>
            <MenuItem>
                {ThemeMode === "light" 
                ? (
                    <IconButton onClick={DarkMode}>
                        <Brightness2 />
                    </IconButton>
                ) : (
                    <IconButton onClick={LightMode}>
                        <Brightness4 />
                    </IconButton>
                )}
                <p>Theme</p>
            </MenuItem>
            <MenuItem>
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
    )

    return (
        <div className={classes.navbar}>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="open drawer"
                            onClick={toggleDrawer(anchor, true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h5" noWrap>
                            Developer LuisF3
                        </Typography>
                        <div className={classes.navbar} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="start"
                                aria-label="call"
                            >
                                <a href="tel:+525534296773">
                                    <CallIcon />
                                </a>
                            </IconButton>
                            {ThemeMode === "light" 
                            ? (
                                <IconButton onClick={DarkMode}>
                                    <Brightness2 />
                                </IconButton>
                            ) : (
                                <IconButton onClick={LightMode}>
                                    <Brightness4 />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="display more actions"
                                edge="end"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar className={classes.toolbar} />
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}
