import { useNavigate } from "react-router-dom";
import { onSubmitForm } from "../logic/onSubmitForm";
import { useState } from "react";
import styles from "../adminRegistration.module.css";
import { checkUnique } from "../logic/checkUnique";
import { useError } from "../../../components/context/error.context";

export function FormAdminRegistration() {
    const [uniqueChecked, setUniqueChecked] = useState<boolean | undefined | "Data">(undefined)
    const navigate = useNavigate()
    const {error, setError} = useError()
    const roles: ["ADMIN", "MODERATOR"] = ["ADMIN", "MODERATOR"]
    const [selectedRole, setSelectedRole] = useState<"ADMIN" | "MODERATOR">("ADMIN");

  return (
    <>
      <form
        className="mt-6"
        method="POST"
        onSubmit={(event) => onSubmitForm(event, navigate, selectedRole, setError)}
        action={"http://localhost:3000/auth/registration-with-role"}
        aria-disabled={
          uniqueChecked === false
            ? true
            : uniqueChecked === "Data"
            ? true
            : false
        }
      >
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
            name="username"
            placeholder="Enter your name"
            className={`${styles.reg_input} w-full px-4 py-2 ring-0 focus:ring-0`}
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
            name="unique_id"
            placeholder="Enter your unique name"
            className={`${styles.reg_input} w-full px-4 py-2 ring-0 focus:ring-0`}
            onChange={(el) => checkUnique(el.target.value, setUniqueChecked)}
          />
          {uniqueChecked === false ? (
            <p className="text-sm text-[#ff4f4f] mt-2 mb-2">
              Unique name already exists
            </p>
          ) : (
            ""
          )}
          {uniqueChecked === "Data" ? (
            <p className="text-sm text-[#ff4f4f] mt-2 mb-2">
              Must be filled in
            </p>
          ) : (
            ""
          )}
          {uniqueChecked === true ? (
            <p className="text-sm text-[#3cda3c] mt-2 mb-2">
              Valid unique name
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="relative mb-4">
          <div className="flex justify-center gap-4 p-1 bg-[#f4eae7] rounded-lg">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`relative px-6 py-2 rounded-md transition-all duration-300 ${
                  selectedRole === role 
                    ? "bg-[#f14b0e] text-white" 
                    : "text-[#9c5f49] hover:bg-[#fceae4]"
                }`}
              >
                <span className="relative z-10">{role}</span>
                {selectedRole === role && (
                  <div className="absolute inset-0 rounded-md overflow-hidden">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#f14b0e] to-[#f96f3a] animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>
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
            name="password"
            required={true}
            placeholder="Enter your password"
            className={`${styles.reg_input}  w-full px-4 py-2 ring-0 focus:ring-0`}
          />
        </div>
        <button
          type="submit"
          className="hover_orange w-full bg-[#f14b0e] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#d1400a] transition-colors"
          disabled={
            uniqueChecked === false
              ? true
              : uniqueChecked === "Data"
              ? true
              : false
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
