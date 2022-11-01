import styles from './Download.module.scss';
import React, {useState} from 'react';
import {BsApple, BsWindows} from 'react-icons/bs';
import axios from 'axios';

const Download = () => {

  const [progress, setProgress] = useState({
    mac: 0,
    window: 0,
  });

  const mac_dmg_url = "https://ipfs.io/ipfs/bafybeig553zkxlerczz6g3syparbiwmlebsc2t6bg7iumq3fqrzvcn4gnu";
  const window_exe_url = "https://ipfs.io/ipfs/bafybeigxmogalso74y6qsswjplkifmmcdmddhdcuo74xwnf2rp5wswslkm";

  const onDownload = async (name: "mac" | "window", url: string) => {
    if(name === "mac" && progress.mac) return;
    if(name === "window" && progress.window) return;

    const file = await axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        if(name === "window") setProgress(state => ({...state, window: Number(progressEvent.progress)}));
        if(name === "mac") setProgress(state => ({...state, mac: Number(progressEvent.progress)}));
      }
    });
    const href = URL.createObjectURL(file.data);
    const link = document.createElement('a');
    link.href = href;
    if(name === "mac") link.setAttribute('download', 'Autoclickers.dmg'); //or any other extension
    if(name === "window") link.setAttribute('download', 'Autoclickers.exe'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    if(name === "mac") setProgress(state => ({...state, mac: 0}))
    if(name === "window") setProgress(state => ({...state, mac: 0}));
  };

  return (
    <div className={styles.container}>

      <button onClick={() => onDownload("mac", mac_dmg_url)} className={`${progress.mac > 0 && styles.started}`} >
        <span><BsApple/></span>
        <span>Mac</span>
        <progress value={progress.mac.toFixed(2)} max="1"/> 
      </button>

      <button onClick={() => onDownload("window", window_exe_url)} className={`${progress.window > 0 && styles.started}`}>
        <span><BsWindows/></span>
        <span>Windows</span>
        <progress value={progress.window.toFixed(2)} max="1"/>
      </button>

    </div>
  )
}

export default Download