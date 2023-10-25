import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Essentials from "../components/Essentials/Essentials";

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

const EssentialsPage = () => {
  return (
    <>
      <Head>
        <title>Essentials</title>
      </Head>
      <Essentials />
    </>
  );
};

export default EssentialsPage;
