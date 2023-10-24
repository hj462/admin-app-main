import Head from "next/head";
import LoginPage from "../components/Login/Login";

export default function Home() {
  return (
    <div className="font-inter">
      <Head>
        <title>C-Thru-AI</title>
        <meta name="description" content="C-Thru-AI" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <LoginPage />
      </main>
    </div>
  );
}
