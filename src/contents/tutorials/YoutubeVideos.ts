export interface VideoTypes {
    title: string,
    src: string,
    thumbnail: string,
    alt: string,
}

export const videos: VideoTypes[] = [
    {
        title: "Part 1 - Simple autoclicker example" ,
        src: "https://www.youtube.com/embed/h_BzVGZR52o",
        thumbnail: "https://nftstorage.link/ipfs/bafkreicbh2lqtzcmpt3zxpocfgr75fm32svu3qwlmi5ivfdu6whfbpgfd4",
        alt: "iron ore autoclicker, part 1"
    },
    {
        title: "Part 2 - Simple autoclicker with more functionality",
        src: "https://www.youtube.com/embed/Wqdq_zIpCdo",
        thumbnail: "https://nftstorage.link/ipfs/bafkreig25usztwsgp2pb2gm6pol646lvztuiuyexly673ftsrnbzxdkx7u",
        alt: "iron ore autoclicker, part 2"
    }
]