import styles from '../home.module.css'

export function SmallImages() {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-col gap-3">
          <div
            className={`${styles.first_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`${styles.second_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`${styles.third_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={`${styles.fourth_grid_image} w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl`}
          ></div>
        </div>
      </div>
    </>
  );
}
