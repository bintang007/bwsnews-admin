import React, {useState} from "react";
import clsx from "clsx";
import MiuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {AccountCircle} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Drawer from "@material-ui/core/Drawer";
import DrawerAppBar from "../drawerappbar";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: ({drawerWidth}) => drawerWidth,
        width: ({drawerWidth}) => `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
}))

const AppBar = () => {
    const drawerWidth = 250;
    const classes = useStyles({drawerWidth});
    const [anchorProfileMenu, setAnchorProfileMenu] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false);

    const isOpenProfileMenu = Boolean(anchorProfileMenu)

    const handleOpenProfileMenu = event => {
        setAnchorProfileMenu(event.currentTarget)
    }

    const handleCloseProfileMenu = _ => {
        setAnchorProfileMenu(null)
    }

    const handleDrawerOpen = _ => {
        setOpenDrawer(true)
    }

    const handleDrawerClose = _ => {
        setOpenDrawer(false)
    }

    const renderProfileMenu = (
        <Menu
            anchorEl={anchorProfileMenu}
            open={isOpenProfileMenu}
            keepMounted
            onClose={handleCloseProfileMenu}>
            <MenuItem onClick={handleCloseProfileMenu}>Pengaturan</MenuItem>
            <MenuItem onClick={handleCloseProfileMenu}>Keluar</MenuItem>
        </Menu>
    )

    return (
        <>
            <MiuiAppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                        edge={"start"}
                        color={"inherit"}
                        onClick={handleDrawerOpen}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={"h6"} noWrap>
                        BWSNEWS-Admin
                    </Typography>
                    <Grid container justify={"flex-end"}>
                        <IconButton
                            aria-label={"account for current user"}
                            onClick={handleOpenProfileMenu}
                            edge={"end"}
                            color={"inherit"}>
                            <AccountCircle/>
                        </IconButton>
                    </Grid>
                </Toolbar>
            </MiuiAppBar>
            <DrawerAppBar drawerWidth={drawerWidth} open={openDrawer} onClose={handleDrawerClose}/>
            {renderProfileMenu}
        </>
    )
}

export default AppBar;