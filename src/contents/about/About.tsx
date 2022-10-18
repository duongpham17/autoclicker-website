import React from 'react';
import Center from 'components/position/Center';
import Animation from 'components/animation/Animation';

const About = () => {
  return (
    <Animation>
      <Center>
          <h1>About</h1>
          <b>
              Desktop application that allows you to create, share and customise autoclicking bots.
              <br/><br/>
              Color detection - Mouse actions - Keyboard events
          </b>
      </Center>
    </Animation>
  )
}

export default About