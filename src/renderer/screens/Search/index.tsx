import React, { useState, useEffect } from 'react';
import { SearchItem, SongCard } from 'renderer/components/SongCard';
import { ipcRenderer } from 'electron';

import styles from './index.module.scss';

export default function Main() {
  const [data, setData] = useState<SearchItem[] | undefined>(undefined);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadFileName, setDownloadFileName] = useState<string>('');

  async function getData() {
    const res = await fetch(
      'https://beatsaver.com/api/search/text/0?sortOrder=Rating&q=porter'
    );
    const jsonData = await res.json();

    setData(jsonData.docs);
  }

  useEffect(() => {
    console.log(`${downloadProgress}%`);
  }, [downloadProgress]);

  useEffect(() => {
    console.log(downloadFileName);
  }, [downloadFileName]);

  useEffect(() => {
    getData();

    ipcRenderer.send('download-item', {
      url: 'https://r2cdn.beatsaver.com/825dbd980eadceaba54c8e9d8e68f93a1b4cb029.zip',
      properties: { directory: '/home/saulo/dev/personal/downbeat/src/temp' },
    });

    ipcRenderer.on('download-progress', (_event, args) => {
      const progress = args[0];
      setDownloadProgress(progress?.percent * 100);
    });

    ipcRenderer.on('download-complete', (_event, args) => {
      const downloadedItem = args[0];
      setDownloadFileName(downloadedItem.path.split('/').pop());
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchResults}>
        {data?.map((searchItem) => (
          <SongCard key={searchItem.id} item={searchItem} />
        ))}
      </div>
    </div>
  );
}
