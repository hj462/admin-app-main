import React from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import RegulationMapping from "../components/Mapping/RegulationMapping";

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

const RegulationMappingPage = () => {
  return (
    <>
      <Head>
        <title>Regulation Mapping</title>
      </Head>
      <RegulationMapping />
    </>
  );
};

export default RegulationMappingPage;
