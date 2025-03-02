import { useEffect, useState } from "react";

export const Error = ({ message, setErr }: {message: string, setErr: any}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  function onClose() {
    setVisible(false);
    setErr(null)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setErr(null)
    }, 4000);

    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 40);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bottom-[50%]">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
      <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center">
          {/* Иконка ошибки */}
          <svg
            className="mx-auto mb-4"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="#f14b0e"
            />
          </svg>
          {/* Заголовок ошибки */}
          <h2 className="text-xl font-bold text-[#1c110d] mb-2">Error</h2>
          {/* Сообщение об ошибке */}
          <p className="text-sm text-[#9c5f49]">{message}</p>
        </div>
        {/* Линия жизни ошибки */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 bg-[#f14b0e] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
