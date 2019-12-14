import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/layout/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

// import 'typeface-open-sans';
// import 'typeface-merriweather';
// import 'typeface-josefin-sans';

class AppWrapper extends App {
  // Next.js method, runs before first render
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(AppWrapper);
