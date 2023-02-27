import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

const Mint: NextPage = () => {
    return (
        <>
        <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Create some <span className={styles.pinkSpan}>NFTS</span>
                </h1>
            </div>
        </main>
        </>
    );
};

export default Mint;
