import React from 'react';
import Animation from 'components/animation/Animation';
import Meta from 'components/meta/Meta';
import About from 'contents/about';

const AboutPage = () => {
  return (
    <Animation>
      <Meta description="desktop application autoclicking robot, customise and share your scripts."/>
      <About />
    </Animation>
  )
}

export default AboutPage