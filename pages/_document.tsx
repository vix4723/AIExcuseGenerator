import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.jpg" />
          <meta
            name="description"
            content="Generate your best excuse to avoid your next commitment"
          />
          <meta property="og:site_name" content="https://excusegeneratorio.vercel.app/" />
          <meta
            property="og:description"
            content="Generate your best excuse to avoid your next commitment"
          />
          <meta property="og:title" content="AI Excuse Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Excuse Generator" />
          <meta
            name="twitter:description"
            content="Generate your best excuse to avoid your next commitment"
          />
          <meta
            property="og:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"
          />
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
