import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../tasks.module.css";
import { Pagination } from "./pagination";
import { fetchTasks } from "../logic/fethTasks";
import { ITask } from "../../../interfaces/tasks/task.interface";

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметры из URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const onPage = parseInt(searchParams.get("onPage") || "5", 10);
  const lvlSorted = searchParams.get("lvlSorted") ?? 'toLow'
  const tags = searchParams.get("tags") ?? ''
  const date = searchParams.get("date") ?? ''
  const level = searchParams.get("level") ?? ''

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks(page, onPage, lvlSorted, tags, date, level);
      if (fetchedTasks) {
        if(fetchedTasks.page) {
          handlePageChange(1)
        }
        if (fetchedTasks.pagination && fetchedTasks.quantity) {
          setTasks(fetchedTasks.pagination);
          setQuantity(fetchedTasks.quantity);
        }
      } else {
        console.error("Failed to fetch tasks");
      }
    };

    loadTasks();
  }, [page, onPage, lvlSorted, tags, date, level]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    // Создаем новый объект параметров поиска, используя текущие значения
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // Обновляем или добавляем параметр 'onPage'
    newSearchParams.set('onPage', newItemsPerPage.toString());

    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    newSearchParams.set('page', newPage.toString())

    setSearchParams(newSearchParams)
  };

  return (
    <>
      <div className={`${styles.list_columns_header} gap-2 flex flex-row p-2`}>
        <h1 className="text-4xl text-center w-[100%] text-[#1c110d] font-bold">Tasks</h1>
      </div>
      <Pagination
        tasks={tasks}
        itemsPerPage={onPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        currentPage={page}
        setCurrentPage={handlePageChange}
        quantity={quantity}
      />
    </>
  );
};

export default TaskList;