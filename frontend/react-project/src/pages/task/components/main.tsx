import { useEffect, useState } from "react";
import { CodeEditor } from "./codeEditor";
import { fetchTask } from "../logic/fethTask";
import { Sidebar } from "./sidebar";
import { setWatched } from "../logic/setWatched";
import Cookie from "js-cookie";
import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";
import { ITaskWithoutAnswer } from "../../../interfaces/tasks/taskWithoutAnswer.interface";

export function MainContent({ id }: { id: number }) {
  const [data, setData] = useState<{ [any: string]: any } | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function loadTask(id: number) {
      const data = await fetchTask(id);
      setData(data);
    }

    loadTask(id);
  }, [id]);

  useEffect(() => {
    const userStr = Cookie.get("user");
    if (userStr && id) {
      const data = JSON.parse(userStr) as IUserWitoutPassword;
      setUser(data);
      setWatched(JSON.parse(userStr).id, Number(id));
    }
  }, []);

  return (
    <>
      {data ? (
        <>
          <Sidebar
            resTestCases={data.cases.solution}
            casesValues={data.cases.testCasesRes}
            user={user}
            task={data.task}
          />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 pl-4">
              <div className="mx-auto">
                <h1 className="text-3xl bg-[#f4eae7] text-center font-bold text-[#1c110d] mb-4 p-4">
                  {data.task?.title ? data.task.title : "Loading..."}
                </h1>
                <CodeEditor task={data.task} />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
