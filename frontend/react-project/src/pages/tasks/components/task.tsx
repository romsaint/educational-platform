import styles from '../tasks.module.css'


const Task = ({ level, title, date, isAttempted, id}: {level: string, title: string, date: string, isAttempted: boolean, id: number}) => {
  return (
    <div className="task gap-2 flex flex-row mb-2">
      <a href={`/tasks?lvl=${level.toLowerCase()}`} className={`${styles.task_lvl} text-[${level === 'Easy' ? '#499c5e' : level === 'Medium' ? '#9d6425' : '#a51d1d'}] text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7]`}>
        {level}
      </a>
      <a href={`/task/${id}`} className={`${styles.task_text} hover_light_orange w-100 flex flex-row gap-1 p-2 bg-[#f4eae7] rounded`}>
        <h3 className="text-[#1c110d] text-sm font-medium leading-normal">{title}</h3>
        
      </a>
      {isAttempted ? 
        <p className={`${styles.task_attempted_svg} min-w-[60px] text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7]`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20.788 3.832c-.101-.105-.197-.213-.301-.317c-.103-.103-.211-.202-.32-.302A11.903 11.903 0 0 0 12 0a11.926 11.926 0 0 0-8.486 3.514C-1.062 8.09-1.16 15.47 3.213 20.168c.099.108.197.214.3.32c.104.103.21.2.317.3A11.92 11.92 0 0 0 12 24c3.206 0 6.22-1.247 8.487-3.512c4.576-4.576 4.673-11.956.301-16.656zm-16.655.301A11.057 11.057 0 0 1 12 .874c2.825 0 5.49 1.048 7.55 2.958l-1.001 1.002A9.646 9.646 0 0 0 12 2.292a9.644 9.644 0 0 0-6.865 2.844A9.644 9.644 0 0 0 2.292 12c0 2.448.9 4.753 2.542 6.549L3.831 19.55C-.201 15.191-.101 8.367 4.133 4.133zm13.798 1.318v.002l-1.015 1.014A7.346 7.346 0 0 0 12 4.589A7.357 7.357 0 0 0 6.761 6.76A7.362 7.362 0 0 0 4.589 12a7.34 7.34 0 0 0 1.877 4.913l-1.014 1.016A8.77 8.77 0 0 1 3.167 12a8.77 8.77 0 0 1 2.588-6.245A8.771 8.771 0 0 1 12 3.167c2.213 0 4.301.809 5.931 2.284zM18.537 12c0 1.745-.681 3.387-1.916 4.622S13.746 18.538 12 18.538a6.491 6.491 0 0 1-4.296-1.621l-.001-.004c-.11-.094-.22-.188-.324-.291a6.027 6.027 0 0 1-.293-.326A6.47 6.47 0 0 1 5.466 12c0-1.746.679-3.387 1.914-4.621A6.488 6.488 0 0 1 12 5.465c1.599 0 3.105.576 4.295 1.62c.111.096.224.19.326.295c.104.104.2.214.295.324A6.482 6.482 0 0 1 18.537 12zM7.084 17.534h.001A7.349 7.349 0 0 0 12 19.413a7.35 7.35 0 0 0 5.239-2.174A7.354 7.354 0 0 0 19.412 12a7.364 7.364 0 0 0-1.876-4.916l1.013-1.012A8.777 8.777 0 0 1 20.834 12a8.765 8.765 0 0 1-2.589 6.246A8.764 8.764 0 0 1 12 20.834a8.782 8.782 0 0 1-5.93-2.285l1.014-1.015zm12.783 2.333A11.046 11.046 0 0 1 12 23.125a11.042 11.042 0 0 1-7.551-2.957l1.004-1.001a9.64 9.64 0 0 0 6.549 2.542a9.639 9.639 0 0 0 6.865-2.846A9.642 9.642 0 0 0 21.71 12a9.64 9.64 0 0 0-2.543-6.548l1.001-1.002c4.031 4.359 3.935 11.182-.301 15.417z"/></svg>
        </p>
      : ''}
      
      <p className={`${styles.task_lvl}  text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7] `}>{date}</p>
    </div>
  );
};

export default Task;