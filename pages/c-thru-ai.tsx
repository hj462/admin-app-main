import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import CthruAi from "../components/CthruAi/CthruAi";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const CthruPage = () => {
  return (
    <>
      <Head>
        <title>C-Thru-Ai</title>
      </Head>
      <CthruAi />
    </>
  );
};

export default CthruPage;
