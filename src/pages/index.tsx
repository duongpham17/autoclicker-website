import type { NextPage } from 'next';

import Meta from 'components/meta/Meta';
import Background from 'components/background/Background';

import Home from 'contents/home';

const Pages: NextPage = () => {
  return (
    <>

      <Background />

      <Meta />

      <Home />

    </>
  )
}

export default Pages
