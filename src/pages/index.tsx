import type { NextPage } from 'next';
import Meta from 'components/meta/Meta';
import Home from 'contents/home';
import Animation from 'components/animation/Animation';


const Pages: NextPage = () => {
  return (
    <Animation>
      <Meta />
      <Home />
    </Animation>
  )
}

export default Pages
