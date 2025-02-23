import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../tasks.module.css";
import { Pagination } from "./pagination";
import { fetchTasks } from "../logic/fethTasks";
import { ITask } from "../../../interfaces/task.interface";

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметры из URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const onPage = parseInt(searchParams.get("onPage") || "5", 10);
  const lvlSorted = searchParams.get("lvlSorted") ?? 'toLow'
  const tags = searchParams.get("tags") ?? ''

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks(page, onPage, lvlSorted, tags);
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
  }, [page, onPage, lvlSorted, tags]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    // Создаем новый объект параметров поиска, используя текущие значения
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // Обновляем или добавляем параметр 'onPage'
    newSearchParams.set('onPage', newItemsPerPage.toString());
    // Оставляем 'page' как есть, если он уже был, или добавляем со значением по умолчанию, если нет.
    if (!newSearchParams.has('page')) {
      newSearchParams.set('page', '1'); // Или другое значение по умолчанию
    }
  
    // Обновляем URL
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage: number) => {
    const url = document.URL
    const tagsArr = url.split('tags=')
    const tags = tagsArr[tagsArr.length - 1]

    const lvlSortedArr = url.split('lvlSorted=')
    const lvlSorted = lvlSortedArr[lvlSortedArr.length - 1]
   
    setSearchParams({ page: newPage.toString(), onPage: onPage.toString(), lvlSorted});
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