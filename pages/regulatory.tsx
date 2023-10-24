import React from "react";
import { getSession } from "next-auth/react";
import Regulatory from "../components/Regulatory/Regulatory";
import Head from "next/head";

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

const RegulatoryPage = () => {
  return (
    <>
      <Head>
        <title>Regulatory</title>
      </Head>
      <Regulatory />
    </>
  );
};

export default RegulatoryPage;
