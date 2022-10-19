import React from 'react';
import Animation from 'components/animation/Animation';
import Meta from 'components/meta/Meta';
import Contact from 'contents/contact';

const ContactPage = () => {
  return (
    <Animation>
      <Meta description='want to help improve or add other features, contact me.'/>
      <Contact/>
    </Animation>
  )
}

export default ContactPage