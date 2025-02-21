import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../tasks.module.css";
import { Pagination } from "./pagination";
import { fetchTasks } from "../logic/fethTasks";
import { ITask } from "../interfaces/task.interface";

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметры из URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const onPage = parseInt(searchParams.get("onPage") || "5", 10);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks(page, onPage);
      if (fetchedTasks) {
        if (fetchedTasks.pagination && fetchedTasks.quantity) {
          setTasks(fetchedTasks.pagination);
          setQuantity(fetchedTasks.quantity);
        }
      } else {
        console.error("Failed to fetch tasks");
      }
    };

    loadTasks();
  }, [page, onPage]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    // Обновляем параметр `onPage` в URL
    setSearchParams({ page: page.toString(), onPage: newItemsPerPage.toString() });
  };

  const handlePageChange = (newPage: number) => {
    // Обновляем параметр `page` в URL
    setSearchParams({ page: newPage.toString(), onPage: onPage.toString() });
  };

  return (
    <>
      <div className={`${styles.list_columns_header} gap-2 flex flex-row p-2`}>
        {/* Ваш код для заголовков колонок */}
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