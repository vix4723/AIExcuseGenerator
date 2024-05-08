import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Generate your best excuse to avoid your next commitment"></meta>
          <meta property="og:site_name" content="https://excusegeneratorio.vercel.app/"></meta>
          <meta
            property="og:description"
            content="Generate your best excuse to avoid your next commitment"></meta>

          <meta property="og:title" content="AI Excuse Generator"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:title" content="AI Excuse Generator"></meta>
          <meta
            name="twitter:description"
            content="Generate your best excuse to avoid your next commitment"></meta>
          <meta
            property="og:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"></meta>
          <meta
            name="twitter:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
