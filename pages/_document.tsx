import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Undecided with which Starbucks drink to choose?"></meta>
          <meta property="og:site_name" content="https://excusegeneratorio.vercel.app/"></meta>
          <meta
            property="og:description"
            content="Let me help you decide your next Starbucks drink"></meta>

          <meta property="og:title" content="Starbucks Drink Decider"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:title" content="Starbucks Drink Decider"></meta>
          <meta
            name="twitter:description"
            content="Let me help you decide your next Starbucks drink"></meta>
          <meta
            property="og:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"></meta> {'Change the image'}
          <meta
            name="twitter:image"
            content="https://excusegeneratorio.vercel.app/og-image.png"></meta> {'Change the image'}
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
