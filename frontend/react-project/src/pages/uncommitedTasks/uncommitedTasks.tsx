import { useEffect, useState } from "react";
import { fetchUncommitedTasks } from "./logic/fetchProfile";
import { ITaskProfile } from "../../interfaces/tasks/taskProfile.interface";
import Cookie from "js-cookie";

export function UncommitedTasks() {
  const [uncommitedTasks, setUncommitedTasks] = useState<ITaskProfile[] | null>(
    null
  );
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    // Получаем данные пользователя из Cookie
    const dataUser = Cookie.get("user");
    if (dataUser) {
      setUser(JSON.parse(dataUser));
      console.log(JSON.parse(dataUser));
    }
    async function fetchTasks() {
      const data = await fetchUncommitedTasks();
      console.log(data);
      setUncommitedTasks(data);
    }
    fetchTasks();
  }, []);

  // Функция отправки commit запроса
  async function commitTask(taskId: string) {
    if (user) {
      try {
        const response = await fetch("http://localhost:3001/tasks/commit-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, role: user.role }),
        });
        if (response.ok) {
          // После успешного commit можно удалить задачу из списка
          setUncommitedTasks((prev) =>
            prev ? prev.filter((task) => task.id !== Number(taskId)) : prev
          );
        } else {
          console.error("Commit failed");
        }
      } catch (error) {
        console.error("Error committing task:", error);
      }
    }
  }

  // Если пользователь не админ и не модератор, выводим ограничение доступа
  if (!user || user.role === "USER") {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <p className="text-[#1c110d] text-xl py-4">
          Access restricted: You do not have permissions to commit tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="mb-8 w-full">
        <h2 className="text-[#1c110d] text-2xl font-bold mb-4">
          Uncommitted Tasks
        </h2>
        <div className="flex flex-col gap-4">
          {uncommitedTasks ? (
            uncommitedTasks.length > 0 ? (
              uncommitedTasks.map((task: ITaskProfile) => (
                <div
                  key={task.id}
                  className="bg-[#f4eae7] p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <a
                      href={`/task/${task.id}`}
                      className="text-[#1c110d] text-lg font-medium hover:underline"
                    >
                      {task.title}
                    </a>
                    <div className="flex gap-2 mt-2">
                      {task.tags.split(", ").map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-2 py-1 bg-[#e8d5ce] rounded-md text-[#1c110d]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#f14b0e]">❤️ {task.likes}</span>
                    <button
                      onClick={() => commitTask(task.id.toString())}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Commit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#1c110d] text-xl py-4">
                No uncommitted tasks available
              </p>
            )
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
