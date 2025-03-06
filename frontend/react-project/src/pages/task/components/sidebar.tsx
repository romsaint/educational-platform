import { useEffect, useState } from "react";
import { fetchTasksByTags } from "../logic/fethTaskByTags";
import { ITask } from "../../../interfaces/tasks/task.interface";
import { useSearchParams } from "react-router-dom";
import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";
import { handleTagClick } from "../logic/handleTagClick";
import { onChangeTestCase } from "../logic/onChangeTestCase";
import Cookies from "js-cookie";
import { ITaskWithoutAnswer } from "../../../interfaces/tasks/taskWithoutAnswer.interface";

export function Sidebar({
  task,
  user,
  resTestCases,
  casesValues
}: {
  task: ITaskWithoutAnswer | null;
  user: IUserWitoutPassword | null;
  resTestCases: string[] | null
  casesValues: string[] | null
}) {
  const [tasksByTags, setTasksByTags] = useState<ITask[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(resTestCases, casesValues)
  // Единое состояние для значений тест-кейсов
  const [testCasesValues, setTestCasesValues] = useState<string[] | null>(casesValues);
  

  useEffect(() => {
    async function fetchTasks() {
      if (task !== null && task.tags) {
        const urlArr = document.URL.split("/");
        const id = urlArr[urlArr.length - 1];
        const res = await fetchTasksByTags(task.tags, id);
        setTasksByTags(res);
      }
    }
    fetchTasks();
  }, [task?.tags]);

  return (
    <div className="w-[25%] bg-[#f4eae7] p-4 border-r border-[#e8d5ce] flex flex-col gap-6">
      {/* Description */}
      <div className="description_task">
        <h1 className="text-[#1c110d] text-3xl text-center font-bold mb-4">
          Description Task
        </h1>
        <p className="text-[#1c110d]">
          {task?.description ? task.description : "Loading..."}
        </p>
      </div>

      {/* Test Cases and Expected Output */}
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Test Cases</h2>
        <div>
          {testCasesValues ? testCasesValues.length ? (
            testCasesValues.map((tc, idx) => (
              <input 
                key={idx}
                type="text"
                className="w-full my-2 px-4 py-2 ring-0 focus:ring-0"
                value={tc}
                onChange={e => onChangeTestCase(e.target.value, idx, setTestCasesValues)}
              />
            ))
          ) : (
            "Loading test cases..."
          ): (
            "Loading test cases..."
          )}
        </div>
        <h2 className="text-[#1c110d] text-lg font-bold mt-4 mb-4">
          Expected Output
        </h2>
        <div className="bg-[#fcf9f8] p-3 rounded-lg shadow-sm">
          {resTestCases ? (
            <ul className="list-disc pl-4">
              {resTestCases.map((val, idx) => 
                <li key={idx} className="font-mono text-[#1c110d]">{val}</li>
              )}
            </ul>
          ) : (
            "Loading expected output..."
          )}
        </div>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tasks</h2>
        <ul className="space-y-3">
          {tasksByTags ? (
            tasksByTags.length === 0 ? (
              <div className="flex flex-row gap-2">
                No more tasks by <p className="font-bold">{task?.tags}</p> tags
              </div>
            ) : (
              tasksByTags.map((task) => (
                <a
                  key={task.id}
                  href={`/task/${task.id}`}
                  className="block p-3 bg-[#fcf9f8] text-sm rounded-lg text-[#1c110d] hover:bg-[#e8d5ce] cursor-pointer transition-all"
                >
                  <div className="font-bold">{task.title}</div>
                </a>
              ))
            )
          ) : (
            <li>Loading tasks...</li>
          )}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-[#1c110d] text-lg font-bold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {task?.tags
            ? task.tags.split(",").map((val, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#fcf9f8] rounded-full text-[#1c110d] text-sm hover:bg-[#e8d5ce] cursor-pointer transition-all"
                  onClick={() => handleTagClick(val, searchParams)}
                >
                  #{val.trim()}
                </span>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}
