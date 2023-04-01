import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const lang = this.props.__NEXT_DATA__.props.pageProps?.post?.lang

    return (
      <Html lang={lang ? lang : "en-US"}>
        <Head>
          <meta charSet="utf-8" />
         
          <meta name="theme-color" content="#0c0c0e" />

          <link
            rel="icon"
            href="/favicon.svg"
            sizes="any"
            type="image/svg+xml"
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}