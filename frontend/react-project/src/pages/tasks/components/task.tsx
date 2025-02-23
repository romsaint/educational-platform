import { ITask } from "../../../interfaces/task.interface";
import { fetchTags } from "../logic/fetchTags";
import styles from "../tasks.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Task = ({ task, idx }: { task: ITask; idx: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLevelOptions, setShowLevelOptions] = useState(!!searchParams.get("lvlSorted"));
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [tags, setTags] = useState<{ btrim: string }[]>([]);
  const navigate = useNavigate();

  const [widthTaskText, setWidthTaskText] = useState(0);
  const taskTextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (taskTextRef.current) {
        setWidthTaskText(taskTextRef.current.clientWidth - 52);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Обновление параметров URL
  const updateUrlParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
  
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    navigate(`/tasks?${newSearchParams.toString()}`);
  };

  // Фильтрация по уровню сложности
  const handleLevelFilter = (sorted: boolean) => {
    const lvlSorted = sorted ? "toHigh" : "toLow";
    updateUrlParams({ lvlSorted });
    setShowLevelOptions(!sorted);
  };

  // Фильтрация по тегам
  const handleTagFilter = (tag: string) => {
    const currentTags = searchParams.get("tags") || "";
    const tagsArray = currentTags.split(",").filter((t) => t);

    if (tagsArray.includes(tag)) {
      // Удаляем тег, если он уже выбран
      tagsArray.splice(tagsArray.indexOf(tag), 1);
    } else {
      // Добавляем тег, если он не выбран
      tagsArray.push(tag);
    }

    updateUrlParams({ tags: tagsArray.join(",") });
  };

  // Загрузка тегов
  const handleTagClick = async () => {
    const data = await fetchTags();
    setTags(data);
    setShowTagOptions(!showTagOptions);
  };

  return (
    <div className="task flex flex-row mb-2">
      {/* ФИЛЬТР ПО УРОВНЮ СЛОЖНОСТИ (только для первого task) */}
      {idx === 0 && (
        <div className="relative">
          {/* Стрелочка для фильтра уровня сложности */}
          <button
            onClick={() => handleLevelFilter(showLevelOptions)}
            className="absolute -top-6 left-0 text-[#1c110d] hover:text-[#f14b0e] transition-transform duration-200"
          >
            <span
              className={`min-w-[90px] inline-block transform flex flex-row justify-between`}
              style={{ alignItems: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={` ${showLevelOptions ? "rotate-180" : ""}`}
                width="15"
                height="15"
                viewBox="0 0 12 12"
              >
                <path
                  fill="currentColor"
                  d="M6.786 1.459a.903.903 0 0 0-1.572 0L1.122 8.628C.774 9.238 1.211 10 1.91 10h8.18c.698 0 1.135-.762.787-1.372l-4.092-7.17Z"
                />
              </svg>
              <p>Levels</p>
            </span>
          </button>
        </div>
      )}

      {/* Кнопка уровня сложности */}
      <button
        className={`${styles.task_lvl} hover_light_orange mr-2 text-[${
          task.level === "Easy"
            ? "#499c5e"
            : task.level === "Medium"
            ? "#9d6425"
            : "#a51d1d"
        }] text-sm font-normal leading-normal gap-1 p-2 bg-[#f4eae7]`}
      >
        {task.level}
      </button>

      {/* ФИЛЬТР ПО ТЕГАМ (только для первого task) */}
      {idx === 0 && (
        <div className="relative">
          {/* Стрелочка для фильтра тегов */}
          <button
            onClick={handleTagClick}
            className="absolute -top-6 left-0 text-[#1c110d] hover:text-[#f14b0e] transition-transform duration-200"
            style={{ left: widthTaskText }}
          >
            <span
              className={`inline-block transform flex flex-row justify-between`}
              style={{ alignItems: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={` ${showTagOptions ? "rotate-180" : ""}`}
                width="15"
                height="15"
                viewBox="0 0 12 12"
              >
                <path
                  fill="currentColor"
                  d="M6.786 1.459a.903.903 0 0 0-1.572 0L1.122 8.628C.774 9.238 1.211 10 1.91 10h8.18c.698 0 1.135-.762.787-1.372l-4.092-7.17Z"
                />
              </svg>
              <p>Tags</p>
            </span>
          </button>

          {/* Выпадающий список для тегов */}
          {showTagOptions && (
            <div
              className={`max-h-[100px] w-[${
                widthTaskText + 52
              }] absolute top-0 left-0 bg-[#fcf9f8] rounded-md shadow-md z-10 overflow-y-auto grid grid-cols-3 gap-2 p-2`}
            >
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <button
                    key={tag.btrim}
                    onClick={() => handleTagFilter(tag.btrim)}
                    className="px-4 py-2 text-sm text-[#1c110d] hover:bg-[#e8d5ce] text-left rounded"
                  >
                    #{tag.btrim}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-[#1c110d]">
                  Loading tags...
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ЗАДАЧА */}
      <button
        ref={taskTextRef}
        className={`${styles.task_text} mr-2 flex flex-row justify-between items-center hover_light_orange w-100 gap-1 p-2 bg-[#f4eae7] rounded`}
      >
        <h3 className="text-[#1c110d] text-sm font-medium leading-normal">
          {task.title}
        </h3>
        <div className="tags flex flex-row">
          {task.tags.split(",").map((val: string) => (
            <h3
              key={val}
              className="text-[#1c110d] text-sm font-medium leading-normal mr-2"
            >
              #{val.trim()}
            </h3>
          ))}
        </div>
      </button>

      {/* ФИЛЬТР ПО ДАТЕ */}
      <p
        className={`${styles.task_lvl} mr-2 text-[13px] font-normal leading-normal gap-1 p-2 bg-[#f4eae7]`}
      >
        {new Date(task.date_created).toLocaleDateString()}
      </p>

      {/* ЛАЙКИ */}
      <div className="flex flex-col items-center">
        <button className="text-red-500 hover:text-red-700">❤️</button>
        <span>{task.likes}</span>
      </div>
    </div>
  );
};