import App from 'next/app';
import Page from '../components/page/Page';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

import { ToggleProvider } from '../components/utils/LocalState';

function MyApp({ Component, apollo, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <ToggleProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ToggleProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //This exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
