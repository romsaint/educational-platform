import { useEffect, useState } from "react";
import { fetchTasksByTags } from "../logic/fethTaskByTags";
import { ITask } from "../../tasks/interfaces/task.interface";

export function Sidebar({
  description,
  tags,
}: {
  description: string | undefined;
  tags: string | undefined;
}) {
  const [tasksByTags, setTasksByTags] = useState<ITask[] | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      if (tags) {
        const res = await fetchTasksByTags(tags);
        setTasksByTags(res);
      }
    }
    fetchTasks();
  }, [tags]);

  // === Возвращаемый JSX ===
  return (
    <div className="max-w-[30%] bg-[#f4eae7] p-4 border-r border-[#e8d5ce] flex flex-col gap-6">
      <div className="description_task">
        <h1 className="text-[#1c110d] text-3xl text-center font-bold mb-4">
          Description Task
        </h1>
        <p className="text-[#1c110d]">
          {description ? description : "Loading..."}
        </p>
      </div>
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tasks</h2>
        <ul className="space-y-3">
          {tasksByTags ? (
            tasksByTags.map((task) => (
              <a
                key={task.id} // Предполагается, что у ITask есть поле id
                href={`/task/${task.id}`}
                className="flex justify-between p-3 bg-[#fcf9f8] rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all"
              >
                {task.title} <span>#{task.tags}</span>
              </a>
            ))
          ) : (
            <li>Loading tasks...</li>
          )}
        </ul>
      </div>
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags
            ? tags
                .split(",")
                .map((val) => (
                  <span className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all">
                    #{val}
                  </span>
                ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}
