import { onSubmitForm } from "../../registration/logic/onSubmitForm";
import { useNavigate } from "react-router-dom";
import styles from '../login.module.css'
import { useError } from "../../../../components/context/error.context";

export function FormLogin() {
  const navigate = useNavigate()
  const {error, setError} = useError()

  return (
    <>
      <form className="mt-6"
        method="POST"
        onSubmit={(event) => onSubmitForm(event, navigate, 'login', setError)}
        action={"http://localhost:3000/auth/login"}>
        <div className="mb-4">
          <label
            htmlFor="unique_id"
            className="block text-sm font-medium text-[#1c110d]"
          >
            Unique name
          </label>
          <input
            type="text"
            id="unique_id"
            name="unique_id"
            required={true}
            className={`${styles.reg_input}  w-full px-4 py-2 ring-0 focus:ring-0`}
            placeholder="Enter your unique name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1c110d]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${styles.reg_input}  w-full px-4 py-2 ring-0 focus:ring-0`}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#f14b0e] text-white py-2 px-4 rounded-md hover:bg-[#d13e0b] focus:outline-none focus:ring-2 focus:ring-[#f14b0e] focus:ring-offset-2"
        >
          Log In
        </button>
      </form>
    </>
  );
}
