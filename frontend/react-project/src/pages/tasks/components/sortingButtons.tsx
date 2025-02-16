import styles from '../tasks.module.css'


const SortingButtons = () => {
  return (
    <div className={`${styles.sorted_block } flex flex-row gap-2`}>
      <p className="text-[16px] font-bold leading-tight">Sorted by: </p>
      <button className="hover_light_orange text-[#1c110d] text-sm font-medium leading-normal p-2 bg-[#f4eae7] rounded">name</button>
      <button className="hover_light_orange text-[#1c110d] text-sm font-medium leading-normal p-2 bg-[#f4eae7] rounded">lvl</button>
      <button className="hover_light_orange text-[#1c110d] text-sm font-medium leading-normal p-2 bg-[#f4eae7] rounded">date</button>
    </div>
  );
};

export default SortingButtons;