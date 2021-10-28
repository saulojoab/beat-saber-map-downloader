import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';

import { SearchItem, SongCard } from 'renderer/components/SongCard';

export default function Main() {
  const [data, setData] = useState<SearchItem[] | undefined>(undefined);

  async function getData() {
    const res = await fetch(
      'https://beatsaver.com/api/search/text/0?sortOrder=Rating&q=porter'
    );
    const jsonData = await res.json();

    setData(jsonData.docs);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
