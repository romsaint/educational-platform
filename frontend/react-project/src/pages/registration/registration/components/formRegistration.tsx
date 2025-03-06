import { useNavigate } from "react-router-dom";
import { onSubmitForm } from "../logic/onSubmitForm";
import { useState, useRef } from "react";
import styles from "../registration.module.css";
import { checkUnique } from "../logic/checkUnique";

export function FormRegisration() {
  const [uniqueChecked, setUniqueChecked] = useState<boolean | undefined | "Data">(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref для input type="file"
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null)

  // Обработчик выбора файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
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
        onSubmit={(event) => onSubmitForm(event, navigate, 'registration', setError, selectedFile)}
        action={"http://localhost:3000/auth/registration"}
        aria-disabled={
          uniqueChecked === false
            ? true
            : uniqueChecked === "Data"
            ? true
            : false
        }
      >
        {/* Поле для выбора фотографии */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-[#1c110d] mb-1"
            htmlFor="profile-picture"
          >
            Profile Picture
          </label>
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
              id="profile-picture"
              name="profile-picture"
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

        {/* Поле для имени пользователя */}
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

        {/* Поле для уникального имени */}
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

        {/* Поле для пароля */}
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

        {/* Кнопка отправки формы */}
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