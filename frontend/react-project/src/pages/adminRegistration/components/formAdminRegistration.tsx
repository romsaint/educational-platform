import { useNavigate } from "react-router-dom";
import { onSubmitForm } from "../logic/onSubmitForm";
import { useRef, useState } from "react";
import styles from "../adminRegistration.module.css";
import { checkUnique } from "../../registration/registration/logic/checkUnique";
import { useError } from "../../../components/context/error.context";


export function FormAdminRegistration() {
    const [uniqueChecked, setUniqueChecked] = useState<boolean | undefined | "Data">(undefined)
    const [file, setFile] = useState<null | File>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {error, setError} = useError()
    const [errorImage, setErrorImage] = useState<boolean>(false)
    const [selectedRole, setSelectedRole] = useState<"ADMIN" | "MODERATOR">("ADMIN");

    const fileInputRef = useRef<HTMLInputElement>(null); // Ref для input type="file"
    const navigate = useNavigate()
    const roles: ["ADMIN", "MODERATOR"] = ["ADMIN", "MODERATOR"]

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorImage(false)
      const selectedFile = event.target.files?.[0] || null;
      setFile(selectedFile);
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setErrorImage(true)
        setPreviewUrl(null);
      }
    };
  
    // Обработчик клика по кастомной кнопке
    const handleCustomButtonClick = () => {
      fileInputRef.current?.click(); // Программно вызываем клик по скрытому input
    };
  
  return (
    <>
      <form
        className="mt-6"
        method="POST"
        onSubmit={(event) => onSubmitForm(event, navigate, selectedRole, setError, file)}
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
            htmlFor="file"
          >
            Profile Picture
          </label>
          {errorImage ? (
            <h1 className="text-lg text-[#ff3b3b]">Wrong image, try again</h1>
          ) : ''}
          <div className="flex items-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-[200px] h-[200px] rounded-full object-cover mr-4"
              />
            )}
            {/* Скрытый input для выбора файла */}
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden" // Скрываем стандартный input
            />
            {/* Кастомная кнопка для выбора файла */}
            <button
              type="button"
              onClick={handleCustomButtonClick}
              className="hover_orange bg-[#f14b0e] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#d1400a] transition-colors"
            >
              Choose File
            </button>
          </div>
        </div>
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
