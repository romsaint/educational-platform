import { useState } from "react";
import styles from "./registration.module.css";
import { checkUnique } from "./logic/checkUnique";

export function Signup() {
  const [err, setErr] = useState(null);
  const [uniqueChecked, setUniqueChecked] = useState<boolean | undefined | "Data">(undefined)

  return (
    <>
      <div className={`${styles.wrap} w-100`}>
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
            <p className="text-sm text-[#9c5f49]">
              Join CodeCamp to start your coding journey.
            </p>
          </div>

          <form className="mt-6" method="POST" action={'http://localhost:3000/registration'} aria-disabled={uniqueChecked === false ? true : (uniqueChecked === 'Data' ? true : false)}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-[#1c110d] mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required={true}
                placeholder="Enter your name"
                className={`${styles.reg_input} w-full px-4 py-2 rounded ring-[#f14b0e] ring-2 focus:ring-[#f14b0e] focus:ring-2`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1c110d] mb-1">
                Unique name
              </label>
              <input
                type="text"
                id="unique_id"
                required={true}
                placeholder="Enter your unique name"
                className={`${styles.reg_input} w-full px-4 py-2 rounded  ring-[#f14b0e] ring-2 focus:ring-[#f14b0e] focus:ring-2`}
                onChange={(el) => checkUnique(el.target.value, setUniqueChecked)}
              />
              {
                uniqueChecked === false ? 
                  <p className="text-sm text-[#ff4f4f] mt-2 mb-2">Unique name already exists</p>
                : "" 
              }
              {
                uniqueChecked === 'Data' ? 
                  <p className="text-sm text-[#ff4f4f] mt-2 mb-2">Must be filled in</p>
                : "" 
              }
              {
                uniqueChecked === true ? 
                  <p className="text-sm text-[#3cda3c] mt-2 mb-2">Valid unique name</p>
                : "" 
              }
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-[#1c110d] mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required={true}
                placeholder="Enter your password"
                className={`${styles.reg_input} w-full px-4 py-2 rounded  ring-[#f14b0e] ring-2 focus:ring-[#f14b0e] focus:ring-2`}
              />
            </div>
            <button
              type="submit"
              className="hover_orange w-full bg-[#f14b0e] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#d1400a] transition-colors"
              disabled={uniqueChecked === false ? true : (uniqueChecked === 'Data' ? true: false)}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#9c5f49]">
            Already have an account?
            <a
              href="#"
              className="text-[#f14b0e] font-medium hover:underline ml-2"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
