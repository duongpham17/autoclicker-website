import type { NextPage } from 'next';

import Meta from 'components/meta/Meta';

import Home from 'contents/home';

const Pages: NextPage = () => {
  return (
    <>
      <Meta />

      <Home />
    </>
  )
}

export default Pages
