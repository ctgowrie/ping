import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query,
})

const Home = ({
  city,
  region,
  country,
  ping_color,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [ value, setValue ] = useState('ping');

  const handlePing = () => {
    fetch('/api/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: value}),
    })
      .then((res) => res.json())
      .then((data) => {
        setValue(data.value || 'ping');
      });
  };

  const nameCase = value[0].toUpperCase() + value.slice(1);
  // TODO casey.gowrie add impression handling here
  const pingColorVariant = `variant${ping_color}`;
  return (
    <div className={styles.container}>
      <Head>
        <title>Ping</title>
        <meta name="description" content="Simple ping test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={`${styles.title} ${styles[pingColorVariant]}`} onClick={handlePing}>
          {nameCase}
        </h1>

        <p className={styles.description}>
          {`Click '${nameCase}' to trigger api call from ${city}, ${region}, ${country}`}
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
  );
}

export default Home;
