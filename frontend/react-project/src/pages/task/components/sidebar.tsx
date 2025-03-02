import { useEffect, useState } from "react";
import { fetchTasksByTags } from "../logic/fethTaskByTags";
import { ITask } from "../../../interfaces/task.interface";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Sidebar({
  description,
  tags,
}: {
  description: string | undefined;
  tags: string | undefined;
}) {
  const [tasksByTags, setTasksByTags] = useState<ITask[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTasks() {
      if (tags) {
        const urlArr = document.URL.split('/')
        const id = urlArr[urlArr.length - 1]
        console.log(id)
        const res = await fetchTasksByTags(tags, id);
        setTasksByTags(res);
      }
    }
    fetchTasks();
  }, [tags]);
  function handleTagClick(tags: string | null) {
    const newSearch = new URLSearchParams(searchParams)
    if(tags) {
      newSearch.set('tags', tags.trim())
      window.history.pushState({}, '', `/tasks?${newSearch.toString()}`);
      location.reload()
      
    }
  }

  // === Возвращаемый JSX ===
  return (
    <div className="w-[25%] bg-[#f4eae7] p-4 border-r border-[#e8d5ce] flex flex-col gap-6">
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
            tasksByTags.length === 0 ? (<div className="flex flex-row gap-2">No more tasks by <p className="font-bold">{tags}</p> tags</div>) : tasksByTags.map((task) => (
              <a
                key={task.id} // Предполагается, что у ITask есть поле id
                href={`/task/${task.id}`}
                className="flex justify-between p-3 bg-[#fcf9f8] text-sm rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all"
              >
                {task.title}
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
                  <span
                   className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all"
                    onClick={() => handleTagClick(val)}
                   >
                    #{val}
                  </span>
                ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}
