// import App from 'next/app'
import Head from "next/head";
import type { ComponentType, ComponentProps} from 'react'

import { CarsProvider } from "./../components/contexts/car.context";

type MyAppProps = { Component:ComponentType, pageProps:Record<any,any> };

function MyApp({ Component, pageProps }:MyAppProps){
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <CarsProvider>
        <Component {...pageProps} />
      </CarsProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
