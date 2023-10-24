import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import googleLogo from "../../assets/google-logo.png";
import Navbar from "../common/Navbar";

const Login = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      push("geography");
    }
  }, [status]);
  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex">
          <div className="w-[500px] bg-white rounded-lg p-8 flex flex-col m-auto mt-10 md:mt-0 relative z-10 shadow-lg">
            <h1 className="text-center mb-2 text-2xl text-[#393232] font-medium">
              Welcome to C-Thru-ai
            </h1>
            <p className="text-center text-sm text-[#393232] leading-6 font-normal mb-6">
              {`Don't have an account?`}
              <Link href="" className="underline text-blue-700 ml-1">
                Sign Up
              </Link>
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => signIn("google")}
                className="shadow w-80  h-14 flex text-[#0000008A] font-medium justify-center bg-white items-center border-0  focus:outline-none rounded-lg text-xl"
              >
                <Image
                  src={googleLogo}
                  alt="google-logo"
                  className="mr-3 h-5 w-5"
                />
                Sign In with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
