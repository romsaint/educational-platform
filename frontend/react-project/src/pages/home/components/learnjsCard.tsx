import { Link } from 'react-router-dom';
import styles from '../home.module.css'


export function LearnjsCard() {
  return (
    <>
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className={`${styles.learnjs__main} flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10`}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                Learn JavaScript
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                From the basics to advanced topics, our courses help you gain
                skills in the world's most popular programming language.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f14b0e] text-[#fcf9f8] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <Link to='/tasks'>
              <span className="truncate">Start Learning</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
