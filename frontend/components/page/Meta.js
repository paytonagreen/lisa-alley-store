import Head from 'next/head';

const Meta = () => (
  <Head>
    {/* Global site tag (gtag.js) - Google Analytics */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180962814-1"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'UA-180962814-1', {
          page_path: window.location.pathname,
        });
        gtag('config', 'G-FR314WX65Z');
        `,
      }}
      />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta charSet="utf-8"/>
    <link rel="shortcut icon" href="static/favicon.ico"/>
    <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC&family=Cinzel&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" type ="text/css" href="static/nprogress.css"/>
    <title>Lisa Alley</title>
  </Head>
);

export default Meta;