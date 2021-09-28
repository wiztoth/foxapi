import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wizapi - Welcome to stars API </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1 className={styles.title}>
          wizAPI &#10024;
        </h1>

       

        <div className={styles.grid}>
          <a href="/doc" className={styles.card}>
            <h2>Usage &rarr;</h2>
            <p>Discover all options for getting your stars messages.</p>
          </a>

       

         

         
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/wiztoth"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          <span className={styles.logo}>
            <Image src="/octocat.svg" alt="Github Logo" width={100} height={45} />
          </span>
        </a>
      </footer>
    </div>
  )
}
