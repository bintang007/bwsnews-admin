import React, {Fragment, useEffect} from "react";
import '../styles/globals.css'
import PropTypes from "prop-types"
import Head from "next/head";
import {ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import {Provider} from "next-auth/client";

function MyApp({Component, pageProps}) {

    useEffect(() => {
        // Remove the server-side injected CSS
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, []);

    return (
        <Fragment>
            <Head>
                <title>BWS News - Panel Admin</title>
                <meta name={"viewport"} content={"minimum-scale=1, initial-scale=1, width=device-width"}/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Provider session={pageProps.session}>
                    <Component {...pageProps}/>
                </Provider>

            </ThemeProvider>
        </Fragment>
    )
}

MyApp.prototype = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired
}

export default MyApp
