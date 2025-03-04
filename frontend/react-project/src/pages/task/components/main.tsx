import { useEffect, useState } from "react";
import { CodeEditor } from "./codeEditor";
import { Output } from "./output";
import { ITask } from "../../../interfaces/tasks/task.interface";
import { fetchTask } from "../logic/fethTask";
import { Sidebar } from "./sidebar";
import { setWatched } from '../logic/setWatched'
import Cookie from 'js-cookie';


export function MainContent({ id }: { id: number }) {
  const [task, setTask] = useState<ITask | null>(null);
  const [user, setUser] = useState<{[key: string]: any} | null>(null)

  useEffect(() => {
    async function loadTask(id: number) {
      const data = await fetchTask(id);
      setTask(data);
    }

    loadTask(id);
  }, [id]);

  useEffect(() => {
    const userStr = Cookie.get('user')
    if(userStr && id) {

      setUser(JSON.parse(userStr))
      setWatched(JSON.parse(userStr).id, Number(id))
    }
  }, [])

  return (
    <>
      <Sidebar description={task?.description} tags={task?.tags} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 pl-4">
          <div className="mx-auto">
            <h1 className="text-3xl bg-[#f4eae7] text-center font-bold text-[#1c110d] mb-4 p-4">
              {task?.title ? task.title : 'Loading...'}
            </h1>
            <CodeEditor />
            <Output />
          </div>
        </div>
      </div>
    </>
  );
}
