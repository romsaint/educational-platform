import Task from "./task";
import styles from '../tasks.module.css'


const TaskList = () => {
  const tasks = [
    {
      level: "Easy",
      title: "44 Sum",
      date: "15.02.2025",
      isAttempted: false,
      id: 1
    },
    {
      level: "Medium",
      title: "Two Sum",
      date: "12.02.2025",
      isAttempted: true,
      id: 2
    },
    {
      level: "Hard",
      title: "1 Sum",
      date: "09.02.2025",
      isAttempted: false,
      id: 3
    },
  ];

  return (
    <>
      <div className={`${styles.list_columns_header} gap-2 flex flex-row p-2`}>
        <div className={`${styles.wrap_column_header} flex justify-center  min-w-[90px]`}>
            <p className={`${styles.column_header}`}>
              Level
              </p>
          </div>
        <div className={`${styles.wrap_column_header} ${styles.title_column_header} flex justify-center  min-w-[90px]`}><p className={`${styles.column_header}`}>Title</p></div>
        <div className={`${styles.wrap_column_header} flex justify-center  min-w-[60px]`}>
            <p className={`${styles.column_header}`}>
              Status
            </p>
          </div>
        <div className={`${styles.wrap_column_header} flex justify-center  min-w-[90px]`}>
          <p className={`${styles.column_header}`}>
            Date
            <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.sort_arrow}`} width="15" height="15" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 10v4m0 0h4m-4 0l4-4"/></g></svg>
          </p>
        </div>
      </div>
      <div className="flex flex-col p-2">
        {tasks.map((task, index) => (
          <Task key={index} {...task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
