import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Doc.module.css'

function Doc() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Foxapi - Documentation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
      </Head>

      <main className={styles.main}>
      
        <h1 className={styles.title}> <a href="https://foxapi.vercel.app">FOXAPI </a> </h1>
       
        <h4 className={styles.title}> Usage Reference 📝 </h4> <br /><br/>
        
        <p>
          
        <h6 className={styles.titleh6}>  1. Go to Endpoint:  </h6> <br/><code className={styles.code_bg}> https://foxapi.vercel.app/api/horoscope </code>
        <br /><br/><br />
        <h6 className={styles.titleh6}>  2. Get messages from the stars:  </h6> 
                <p> Add to endpoint query parameters | all messages provided in 🇮🇹 language </p>
               
             
                <table>
                <thead >
                <tr >
                    <th className={styles.th}>Parameters</th>
                   
                    <th className={styles.th}>Description</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td className={styles.td}>sign</td>
                   
                    <td className={styles.tdesc}>All sign in italian lang, for example: <i>Vergine</i> for virgo.</td>
                </tr>

                <tr>
                    <td className={styles.td}>astrologer</td>
                   
                    <td className={styles.tdesc}>Use last name of your favourite astrologer. <i>fox</i> or <i>brezsny</i> for example. </td>
                </tr>
                </tbody>

                
                  </table><br/>
                  <h6 className={styles.titleh6}>  Example using Paolo Fox for Virgo sign:  </h6> <br/>
                  <code className={styles.code_bg}><a href="https://foxapi.vercel.app/api/horoscope?sign=vergine&astrologer=fox"> https://foxapi.vercel.app/api/horoscope?sign=vergine&astrologer=fox </a></code>

      </p>
<br/><br/>      <a
          href="https://github.com/wiztoth"
          target="_blank"
          rel="noopener noreferrer"
        >
          
          <span className={styles.logo}>
            <Image src="/octocat.svg" alt="Github Logo" width={100} height={45} />
          </span>
        </a>
 
      </main>
      
      
   







      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    </div>

  )



}

export default Doc
