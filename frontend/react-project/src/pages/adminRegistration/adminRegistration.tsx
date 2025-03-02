import { useEffect, useState } from "react";
import styles from "./adminRegistration.module.css";
import Cookies from "js-cookie";
import { FormAdminRegistration } from "./components/formAdminRegistration";
import { Link } from "react-router-dom";
import { Error } from "../../components/erorr";
import { useError } from "../../components/context/error.context";

export function AdminRegistration() {
  const [isReg, setIsReg] = useState<string | undefined>(undefined);
  const {error, setError} = useError()

  useEffect(() => {
    const user = Cookies.get("user");
    setIsReg(user);
  }, []);

  return (
    <>
      <div className={`${styles.wrap} w-100`}>
        {error ? <Error message={error} setErr={setError} /> : ''}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <svg
              className="mx-auto mb-6"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="32" fill="#f4eae7" />
              <path
                d="M32 40C36.4183 40 40 36.4183 40 32C40 27.5817 36.4183 24 32 24C27.5817 24 24 27.5817 24 32C24 36.4183 27.5817 40 32 40Z"
                fill="#f14b0e"
              />
              <path
                d="M32 36C34.2091 36 36 34.2091 36 32C36 29.7909 34.2091 28 32 28C29.7909 28 28 29.7909 28 32C28 34.2091 29.7909 36 32 36Z"
                fill="#fcf9f8"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#1c110d] mb-2">
              Create an Account
            </h2>
            {isReg === undefined ? (
              <p className="text-sm text-[#9c5f49]">
                Join CodeCamp to start your coding journey.
              </p>
            ) : (
              ""
            )}
          </div>

          {isReg === undefined ? (
            <FormAdminRegistration />
          ) : (
            <h1 className={`${styles.already_logged} text-center text-2xl`}>
              You've already logged in
            </h1>
          )}

          <p className="mt-6 text-center text-sm text-[#9c5f49]">
            Already have an account?
            <Link to={"/login"}>
              <a
                href="#"
                className="text-[#f14b0e] font-medium hover:underline ml-2"
              >
                Log in
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
