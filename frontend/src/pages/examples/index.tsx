import styles from './Examples.module.scss';
import { Fragment } from 'react';
import useOpen from '@hooks/useOpen';
import Container from '@components/containers/Style1';
import Button from '@components/animations/buttons/Style1';
import Text from '@components/texts/Style2';

export const videos = {
  title: "Mouse Event Videos",
  data: [
    {
      sub: "mouseClick",
      text: "Clicks the left, middle, or right mouse button.",
      youtube: "https://www.youtube.com/embed/bet7_wRLJ6Q?si=DbdqIDu-LGOUjiYQ",
    },
    {
      sub: "moveMouseAndClick",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Then clicks left, middle or right after 0.1 second.",
      youtube: "https://www.youtube.com/embed/hYXWHpSU3SQ?si=TSP8Y6VFDOkdBELI",
    },
    {
      sub: "dragMouse",
      text: 'Drags the mouse to the specified x and y coordinates. Must be used with mouseToggle "down" at the start and "up" after dragging is complete.',
      youtube: "https://www.youtube.com/embed/PxnpbXliIKE?si=WkDhEKaeSH0zlMex"
    },
    {
      sub: "getPixelColor",
      text: "Enter the X and Y coordinates to read the color of the screen at that point. If the color matches, you can trigger additional mouse events. The WAIT input field lets you specify a number of seconds to wait for the pixel color to match. The script will check the color every second, looping until the specified time runs out.",
      youtube: "https://www.youtube.com/embed/rdbx52uPTvQ?si=hsofN7qhUU5YHDK_"
    },
    {
      sub: "keyTap",
      text: "Simulates tapping a key on the keyboard. You can also use modifiers like Shift, Alt, or Control, and combine them—for example, Shift + Command.",
      youtube: "https://www.youtube.com/embed/oRocYm0z1Cg?si=o_qdrpIV0dOe2F7k"
    },
    {
      sub: "typeString",
      text: "Types out a sentence or string of text.",
      youtube: "https://www.youtube.com/embed/1uKrHz4aBdQ?si=195o9dkNGNVFS4Oo",
    },
    {
      sub: "moveMouseSmoothAndClick",
      text: "Moves the mouse pointer smoothly across the screen to the specified coordinates, while its moving the timer will be paused. Then clicks left, middle or right after 0.1 second.",
      youtube: "https://www.youtube.com/embed/n5B_9up8coc?si=afeIeqFLSUYmCr-w",
    },
  ]
}

const Examples = () => {

  const {onOpenArray, array} = useOpen({});

  return (
    <div className={styles.container}>
      <h2>{videos.title}</h2>
      {videos.data.map(el => 
        <Container color="dark" key={el.sub}>
          <Button onClick={() => onOpenArray(el.sub)} open={array.includes(el.sub)}>{el.sub}</Button>
          {array.includes(el.sub) && 
            <Fragment>
              <Text color="light">{el.text}</Text>
              <iframe src={el.youtube} title="YouTube video player" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
            </Fragment>
          }
        </Container>
      )}
    </div>
  )
}

export default Examples