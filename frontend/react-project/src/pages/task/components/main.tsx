import { useEffect, useState } from "react";
import { CodeEditor } from "./codeEditor";
import { fetchTask } from "../logic/fethTask";
import { Sidebar } from "./sidebar";
import { setWatched } from "../logic/setWatched";
import Cookie from "js-cookie";
import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";
import { commitTask } from "../logic/commitTask";
import { useNavigate } from "react-router-dom";

export function MainContent({ id }: { id: number }) {
  const [data, setData] = useState<{ [any: string]: any } | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadTask(id: number) {
      const data = await fetchTask(id);
      console.log(data)
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
            task={data.task}
            dataFromMain={data}
          />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 pl-4">
              <div className="mx-auto">
                {user.role !== 'USER' && data.task && !data.task.iscommited
                ?<>
                  <div className="title_commit flex flex-row justify-center gap-10 bg-[#f4eae7] font-bold text-[#1c110d] mb-4 p-4">
                  <h1 className="text-3xl">
                    {data.task?.title ? data.task.title : "Loading..."}
                  </h1>
                  <button
                      onClick={() => commitTask(data.task.id.toString(), user, navigate)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Commit
                    </button>
                </div>
                </>
                :
                <>
                <h1 className="text-3xl text-center bg-[#f4eae7] font-bold text-[#1c110d] mb-4 p-4">
                  {data.task?.title ? data.task.title : "Loading..."}
                </h1>
                </>}
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
