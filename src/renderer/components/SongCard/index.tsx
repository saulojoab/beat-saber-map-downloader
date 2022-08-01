import React from 'react';

import { FaPlay, FaThumbsUp, FaThumbsDown, FaDownload } from 'react-icons/fa';

import styles from './index.modules.scss';

export interface SearchItem {
  automapper: boolean;
  createdAt: string;
  description: string;
  id: string;
  lastPublishedAt: string;
  metadata: {
    bpm: number;
    duration: number;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
  };
  name: string;
  qualified: boolean;
  ranked: boolean;
  stats: {
    plays: number;
    downloads: number;
    upvotes: number;
    downvotes: number;
    score: number;
  };
  updatedAt: string;
  uploaded: string;
  uploader: {
    avatar: string;
    id: number;
    name: string;
    type: string;
    uniqueSet: boolean;
  };
  versions: [
    {
      coverURL: string;
      downloadURL: string;
    }
  ];
}

interface SongCardProps {
  item: SearchItem;
}

export const SongCard: React.FC<SongCardProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.songData}>
        <div className={styles.info}>
          <span className={styles.songTitle}>{item.name}</span>
          <span className={styles.uploaderName}>by: {item.uploader.name}</span>
        </div>
        <div className={styles.stats}>
          <span className={styles.statsItem}>
            <FaPlay /> {item.stats.plays}
          </span>
          <span className={styles.statsItem}>
            <FaThumbsUp /> {item.stats.upvotes}
          </span>
          <span className={styles.statsItem}>
            <FaThumbsDown /> {item.stats.downvotes}
          </span>
          <span className={styles.statsItem}>
            <FaDownload /> {item.stats.downloads}
          </span>
        </div>
      </div>
      <div className={styles.songCover}>
        <div className={styles.blackSquare} />
        <img
          className={styles.image}
          alt={`${item.name} album cover`}
          src={item.versions[0].coverURL}
        />
      </div>
    </div>
  );
};
