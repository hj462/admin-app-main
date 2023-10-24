import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import MLOps from "../components/MLOps/MLOps";

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

const MLOpsPage = () => {
  return (
    <>
      <Head>
        <title>MLOps</title>
      </Head>
      <MLOps />
    </>
  );
};

export default MLOpsPage;
