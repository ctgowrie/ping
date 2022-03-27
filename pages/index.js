import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Home() {
  const { value, setValue } = useState('');

  const handlePing = () => {
    fetch('/api/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: 'ping',
    })
      .then((res) => res.json())
      .then((data) => setValue(data.value));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ping</title>
        <meta name="description" content="Simple ping test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} onClick={handlePing}>
          Ping
        </h1>

        <p className={styles.description}>
          {"Click 'ping' to trigger api call."}
          {value}
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
