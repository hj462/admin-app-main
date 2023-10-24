import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Geography from "../components/Geography/Geography";
import { GetAllGeopgraphies } from "./api/AdminAPIs/Geography";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const geographyData = await GetAllGeopgraphies();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, data: geographyData },
  };
}

const GeographyPage = ({ data }: any) => {
  const geographyData = data;
  return (
    <>
      <Head>
        <title>Geography</title>
      </Head>
      <Geography geographyData={geographyData} />
    </>
  );
};

export default GeographyPage;
