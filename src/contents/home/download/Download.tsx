import styles from './Download.module.scss';
import React, {useState} from 'react';
import {BsApple, BsWindows} from 'react-icons/bs';
import axios from 'axios';

const Download = () => {

  const [progress, setProgress] = useState({
    mac: 0,
    window: 0,
  });

  const onDownload = async (name: "mac" | "window") => {
    if(name === "mac" && progress.mac) return;
    if(name === "window" && progress.window) return;

    const mac_dmg_url = "https://ipfs.io/ipfs/bafybeibiodppvbacfcsze5t2mibipuzhm4tnopsqu22g3huf6t2qlkddiy";
    const window_exe_url = "";

    const url = name === "mac" ? mac_dmg_url : window_exe_url;

    const file = await axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent.progress);
          if(name === "mac") setProgress(state => ({...state, mac: Number(progressEvent.progress)}));
          if(name === "window") setProgress(state => ({...state, window: Number(progressEvent.progress)}));
      }
    });
    const href = URL.createObjectURL(file.data);
    const link = document.createElement('a');
    link.href = href;
    if(name === "mac") link.setAttribute('download', 'Autoclickers.dmg'); //or any other extension
    if(name === "window") link.setAttribute('download', 'Autoclickers.dmg'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    if(name === "mac")setProgress(state => ({...state, mac: 0}))
    if(name === "window")setProgress(state => ({...state, mac: 0}))
  };

  return (
    <div className={styles.container}>

      <button onClick={() => onDownload("mac")}>
        <span><BsApple/></span>
        <span>Download for Mac</span>
        <progress value={progress.mac.toFixed(2)} max="1"/> 
      </button>

      <button>
        <span><BsWindows/></span>
        <span>Not supported yet</span>
        <progress value={progress.window.toFixed(2)} max="1"/>
      </button>

    </div>
  )
}

export default Download