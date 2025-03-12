import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import { ITaskProfile } from "../../interfaces/tasks/taskProfile.interface";
import { IUserProfile } from "../../interfaces/users/userProfile";
import { ChartComponent } from "./components/chartLevels";
import { DateChartComponent } from "./components/dateChart";
import { fetchProfile } from "./logic/fetchProfile";


export function Profile() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [dataProfile, setDataProfile] = useState<{[key: string]: any} | null>(null);

  useEffect(() => {
    const userStr = Cookie.get("user");
    async function fetchData() {
      setDataProfile(await fetchProfile())
    }
    fetchData()
    if (userStr) {
      setUser (JSON.parse(userStr));
    }
  }, []);

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="mt-8 layout-content-container flex flex-col flex-1">
        {user ? (
          <>
            <div className="role flex gap-40 flex-row mb-6 items-center">
              <h1 className="text-[#1c110d] text-3xl font-bold">
                User Profile
              </h1>
              {/* WITH ROLE */}
              {user.role !== 'USER' ? 
              <>
                <h1 className="text-[#f14b0e] text-3xl font-bold">{user.role}</h1>
                <div className="privileges">
                  <a href="/uncommited-tasks" className="text-[#f14b0e] text-lg font-bold">Commit tasks</a>
                </div>
                </> 
              : ''}
            </div>
            {/* Основная информация */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="w-[200px] h-[200px] rounded-full bg-[#f4eae7] flex items-center justify-center">
                  <img
                    src={`http://localhost:3000/avatar/${user.avatar}`}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[#1c110d] text-2xl font-bold">
                  {user.username}
                </h2>
                <p className="text-[#9d6425] text-sm">
                  Member since {new Date(user.date_created).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f4eae7] p-6 rounded-xl">
                <h3 className="text-[#1c110d] text-xl font-bold mb-2">
                  Liked tasks
                </h3>
                <p className="text-[#f14b0e] text-3xl font-bold">
                  {/* {user.likesReceived} */} 52
                </p>
              </div>
              <div className="bg-[#f4eae7] p-6 rounded-xl">
                <h3 className="text-[#1c110d] text-xl font-bold mb-2">
                  Completed tasks
                </h3>
                <p className="text-[#f14b0e] text-3xl font-bold">
                  {dataProfile ? dataProfile.completedTasks.length : 'Loading...'}
                </p>
              </div>
            </div>
            <div className="charts flex flex-row justify-between">
              <ChartComponent countByLevel={dataProfile?.countByLevel} />
              <DateChartComponent monthTasks={dataProfile?.monthTsks} />
            </div>
            {/* Созданные задания */}
            <div className="mb-8">
              <h2 className="text-[#1c110d] text-2xl font-bold mb-4">
                Last watched tasks
              </h2>
              <div className="flex flex-col gap-4">
                {dataProfile ? dataProfile.watched.length > 0 ? (
                  dataProfile.watched.map((task: ITaskProfile) => (
                    <div
                      key={task.id}
                      className="bg-[#f4eae7] p-4 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <a href={`/task/${task.id}`} className="text-[#1c110d] text-lg font-medium">
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
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#1c110d] text-xl py-4">
                    No watched tasks yet
                  </p>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>

            <Link
              to="/tasks"
              className="text-center w-[100%] self-start px-6 py-2 bg-[#f14b0e] text-[#fcf9f8] rounded-md hover:bg-[#e0440d] transition-colors"
            >
              Back to Tasks
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-[#1c110d] text-3xl font-bold text-center mb-6 mt-6">Login, please</h1>
            <a href="/registration" className="text-3xl font-bold text-center">REGISTRATION</a>
          </>
        )}
      </div>
    </div>
  );
}