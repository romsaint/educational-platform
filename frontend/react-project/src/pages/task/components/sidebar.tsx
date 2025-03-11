import { useEffect, useState } from "react";
import { fetchTasksByTags } from "../logic/fethTaskByTags";
import { ITask } from "../../../interfaces/tasks/task.interface";
import { useSearchParams } from "react-router-dom";
import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";
import { handleTagClick } from "../logic/handleTagClick";
import Cookies from "js-cookie";
import { fetchAnswerForAdmin } from "../logic/fetchAnswerForAdmin";
import { ITaskWithoutAnswer } from "../../../interfaces/tasks/taskWithoutAnswer.interface";
import { onChangeTestCase } from "../logic/onChangeTestCase";

export function Sidebar({
  task,
  dataFromMain,
}: {
  task: ITaskWithoutAnswer | null;
  dataFromMain: { [key: string]: any };
}) {
  const initialCases = Array.isArray(dataFromMain?.cases.testsRes)
    ? dataFromMain.cases.testsRes
    : [];
  const initialCasesRes = Array.isArray(dataFromMain?.cases.testsRes)
    ? dataFromMain.cases.res
    : [];
  const [data, setData] = useState<{ [key: string]: any }>(dataFromMain);
  const [tasksByTags, setTasksByTags] = useState<ITask[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [answer, setAnswer] = useState<string | null>(null);
  const [userCookie, setUserCookie] = useState<IUserWitoutPassword | null>(
    null
  );
  // Храним testCasesValues как массив любых значений, чтобы сохранить исходный тип
  const [testCasesValues, setTestCasesValues] = useState<any[]>(initialCases);
  console.log(data);
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUserCookie(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    async function fetchAnswer() {
      Cookies.set(`test_cases_${task?.id}`, JSON.stringify(testCasesValues));
      if (task && userCookie && task.id && userCookie.role !== "USER") {
        const answ = await fetchAnswerForAdmin(userCookie, task.id);
        if (typeof answ === "string") {
          setAnswer(answ);
        }
      }
    }
    fetchAnswer();
  }, [task, userCookie, testCasesValues]);

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
          {testCasesValues && testCasesValues.length > 0
            ? testCasesValues.map((tc, idx: number) => (
                <input
                  key={idx}
                  type="text"
                  className="w-full my-2 px-4 py-2 ring-0 focus:ring-0"
                  value={
                    typeof tc === "object" ? JSON.stringify(tc) : String(tc)
                  }
                  onChange={(e) =>
                    onChangeTestCase(
                      e.target.value,
                      idx,
                      setTestCasesValues,
                      task?.id,
                      testCasesValues
                    )
                  }
                />
              ))
            : "Loading test cases..."}
        </div>
        <h2 className="text-[#1c110d] text-lg font-bold mt-4 mb-4">Answer</h2>
        <div>
          {initialCasesRes && initialCasesRes.length > 0
            ? initialCasesRes.map((tc: any, idx: number) => (
                <input
                  key={idx}
                  type="text"
                  disabled
                  className="w-full my-2 px-4 py-2 ring-0 focus:ring-0"
                  value={
                    typeof tc === "object" ? JSON.stringify(tc) : String(tc)
                  }
                />
              ))
            : "Loading test cases..."}
        </div>
        {userCookie?.role !== "USER" ? (
          <div className="answer-for-admin mt-2 mb-2 bg-[#fcf9f8] p-3 rounded-lg shadow-sm">
            <h1 className="font-bold text-2xl mb-4">Answer for admin</h1>
            {answer ? <p className="answer">{answer}</p> : "Loading answer..."}
          </div>
        ) : (
          ""
        )}
 
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
