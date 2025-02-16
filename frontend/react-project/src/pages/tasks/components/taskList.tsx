import Task from './task';

const TaskList = () => {
  const tasks = [
    { level: 'Easy', title: 'Two Sum', date: '15.02.2025' },
    { level: 'Medium', title: 'Two Sum', date: '12.02.2025' },
    { level: 'Hard', title: 'Two Sum', date: '09.02.2025' },
  ];

  return (
    <div className="flex flex-col p-2">
      {tasks.map((task, index) => (
        <Task key={index} {...task} />
      ))}
    </div>
  );
};

export default TaskList;