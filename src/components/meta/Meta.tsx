import Head from 'next/head';

const defaultDescription = "Nail salon, beauty services and products";

interface Props {
    description?: string
}

export const Meta = ({description = defaultDescription }: Props) => 
(        
    <Head>
        <title>Autoclicker</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={description} />
        <meta name="og:title" content="Autoclicker" key="og:title" />
        <meta property="og:url" content="" key="og:url"/>
        <meta property="og:type" content="website" key="og:type"/>
        <meta property="og:image" content="images/favicon.ico" />
        <meta property="og:description" content="Customise your own autoclicker and share with others. Color detection, clicking, movements, typing and keyboard events." />
        <link rel="shortcut icon" href="images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico" />
	    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.ico" />
        
    </Head>
)

export default Meta;