import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.jpg" />
          <meta
            name="description"
            content="Generate your next pixel art profile pic in seconds."
          />
          <meta property="og:site_name" content="pixelprofile.io" />
          <meta
            property="og:description"
            content="Generate your next pixel art profile pic in seconds."
          />
          <meta property="og:title" content="Pixel Art Profile Picture Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pixel Art Profile Picture Generator" />
          <meta
            name="twitter:description"
            content="Generate your next Pixel Art Profile Picture in seconds."
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
