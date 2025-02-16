import styles from '../home.module.css'
import { LearnjsCard } from './learnjsCard';


export function GridImagesHome() {
    return (
      <>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="mt-20 layout-content-container flex flex-col max-w-[960px] flex-1">
            <LearnjsCard />
            <p className="text-[#1c110d] text-base font-normal leading-normal pb-3 pt-1 px-4">
              JavaScript is a powerful and flexible programming language that's essential for web development. Whether
              you're new to coding or an experienced developer, our courses can help you learn and master JavaScript.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3">
                <div className={`${styles.first_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}></div>
              </div>
              <div className="flex flex-col gap-3">
              <div className={`${styles.second_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className={`${styles.third_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}></div>
              </div>
              <div className="flex flex-col gap-3">
              <div className={`${styles.fourth_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }