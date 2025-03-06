import styles from "./login.module.css"; // Создайте файл login.module.css для стилей
import { Link } from "react-router-dom";
import { FormLogin } from "./components/formLogin";
import { Error } from "../../../components/erorr";
import { useState } from "react";

export function Login() {
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <div className={`${styles.wrap} w-100 flex-col`}>
        {error ? <Error message={error} setErr={setError} /> : ''}
        <div className="consent z-0 w-full max-w-md bg-white rounded-lg shadow-lg p-8">
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
              Welcome Back
            </h2>
          </div>

          <FormLogin />

          <p className="mt-6 text-center text-sm text-[#9c5f49]">
            Don't have an account?
            <Link to={"/registration"}>
              <a
                href="#"
                className="text-[#f14b0e] font-medium hover:underline ml-2"
              >
                Sign up
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
