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
        <meta name="og:title" content="autoclickers.co.uk" key="og:title" />
        <meta property="og:type" content="website" key="og:type"/>
        <meta property="og:image" content="images/logo.png" />
        <meta property="og:description" content="Customise your own autoclicker and share with others. Color detection, mouse clicking, mouse movements, typing and keyboard events." />
        <meta name="keywords" content="mouse clicking, mouse movements, desktop, mac, github, free, robot, automation, scripting, scripts, script, friends, share with friends, color detection, keyboard events, auto type words, auto typing, pixel color, detect screen pixel color, fast, easy" />
        <link rel="shortcut icon" href="images/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico" />
	    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.ico" />
        
    </Head>
)

export default Meta;