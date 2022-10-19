import React, { useState } from 'react';
import styles from './Tutorials.module.scss';
import {videos, VideoTypes} from './YoutubeVideos';
import {MdArrowBackIosNew} from 'react-icons/md';

const Tutorials = () => {

    const [view, setView] = useState<VideoTypes | null>(null);

    const onClose = () => setView(null);

    return (
        <div className={styles.container}>

            <div className={styles.title}>
                <h1>Tutorials</h1>
                <p>These tutorials are examples of how to use the application, the concept of creating scripts can be applied every where else.</p>
            </div>

            <div className={styles.map}>
                {videos.map((el, index) => 
                    <div key={index} className={styles.element} onClick={() => setView(el)}>
                        <p>{el.title}</p>
                        <img src={el.thumbnail} alt={el.alt}/>
                    </div>
                )}
            </div>

            {view && 
                <div className={styles.viewVideo} onClick={onClose}>
                    <div>
                        <p>{view.title}</p>
                        <iframe 
                            width="600" height="400" src={view.src}
                            frameBorder="0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        <button><MdArrowBackIosNew/></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Tutorials