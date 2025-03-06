import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export function Header() {
  const [isReg, setIsReg] = useState<{[key: string]: any} | undefined>(undefined);
  useEffect(() => {
    const user = Cookie.get("user");
    if(user) {
      setIsReg(JSON.parse(user));
    }
  }, []);
  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4eae7] px-10 py-3">
        <a href="/" className={`${styles.link_nav}`}>
          <div className="flex items-center gap-4 text-[#1c110d]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#1c110d] text-lg font-bold leading-tight tracking-[-0.015em]">
              CodeCamp
            </h2>
          </div>
        </a>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a
              className={`${styles.link_nav} text-[#1c110d] text-sm font-medium leading-normal`}
              href="/courses"
            >
              Courses
            </a>
            <Link to={"/tasks?lvlSorted=toLow&dateSorted=new"}>
              <p
                className={`${styles.link_nav} text-[#1c110d] text-sm font-medium leading-normal`}
              >
                Tasks
              </p>
            </Link>
            {isReg ? isReg.role !== "USER" ? (
              <Link to={"/create-task"}>
                <p
                  className={`${styles.link_nav} text-[#1c110d] text-sm font-medium leading-normal`}
                >
                  Create task
                </p>
              </Link>
            ) : '' : ''}
            {isReg !== undefined ? (
              <Link to={"/login"}>
                <p
                  className={`${styles.link_nav} text-[#1c110d] text-sm font-medium leading-normal`}
                >
                  Login
                </p>
              </Link>
            ) : ''}
          </div>
          <div className="flex gap-2">
            {isReg === undefined ? (
                  <a href="/registration" className={`${styles.link_header_reg} truncate`}>
                    <button className="hover_orange flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 bg-[#f14b0e] text-[#fcf9f8] text-sm font-bold leading-normal tracking-[0.015em]">
                      Registration
                    </button>
                  </a>
              ) : (
                <>
                  <a href="/profile" className={`${styles.link_header_reg} truncate`}>
                    <button className="hover_orange flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 bg-[#f4eae7] text-[#1c110d] text-lg font-bold leading-normal tracking-[0.015em]">
                        {isReg.username}
                    </button>
                  </a>
                </>
              )}

            <button className="hover_orange flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f4eae7] text-[#1c110d] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div
                className="text-[#1c110d]"
                data-icon="Bell"
                data-size="20px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </div>
            </button>
            <button className="hover_orange flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f4eae7] text-[#1c110d] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div
                className="text-[#1c110d]"
                data-icon="ChatCircleDots"
                data-size="20px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
