import styles from '../tasks.module.css'


const Task = ({ level, title, date }: {level: string, title: string, date: string}) => {
  return (
    <div className="task flex flex-row mb-2">
      <a href={`/tasks?lvl=${level.toLowerCase()}`} className={`${styles.task_lvl} text-[${level === 'Easy' ? '#499c5e' : level === 'Medium' ? '#9d6425' : '#a51d1d'}]  mr-3 text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7]`}>
        {level}
      </a>
      <a href="/task/1" className={`${styles.task_text} hover_orange w-100 flex flex-row gap-1 p-2 bg-[#f4eae7] rounded`}>
        <h3 className="text-[#1c110d] text-sm font-medium leading-normal">{title}</h3>
      </a>
      <p className={`${styles.task_lvl}  ml-3 text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7] min-w-[85px]`}>{date}</p>
    </div>
  );
};

export default Task;