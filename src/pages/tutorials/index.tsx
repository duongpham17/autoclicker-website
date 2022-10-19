import React from 'react';
import Meta from 'components/meta/Meta';
import Tutorials from 'contents/tutorials';
import Animation from 'components/animation/Animation';

const AboutPage = () => {
  return (
    <Animation>
      <Meta description="tutorials on how to use autoclicker app for botting games"/>
      <Tutorials />
    </Animation>
  )
}

export default AboutPage