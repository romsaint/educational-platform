import { useNavigate, useSearchParams } from "react-router-dom";
import { ITask } from "../../../interfaces/task.interface";
import { Task } from "./task";


interface PaginationProps {
  tasks: ITask[];
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  quantity: number | null;
}

export const Pagination: React.FC<PaginationProps> = ({
  tasks,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  setCurrentPage,
  quantity,
}) => {
  if (quantity === null) {
    return null;
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const totalPages = Math.ceil(quantity / itemsPerPage);

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#f4eae7] text-[#1c110d] rounded-lg hover:bg-[#e8d5ce] disabled:opacity-50"
      >
        {"<"}
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-[50px] px-4 py-2 ${
            currentPage === i
              ? "bg-[#f14b0e] text-white"
              : "bg-[#f4eae7] text-[#1c110d]"
          } rounded-lg hover:bg-[#e8d5ce]`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#f4eae7] text-[#1c110d] rounded-lg hover:bg-[#e8d5ce] disabled:opacity-50"
      >
        {">"}
      </button>
    );

    return buttons;
  };
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

  const handSetleLevelFilter = (level: string | null) => {
    if(level) {
      updateUrlParams({ level });
    }
  };

  
  return (
    <div className="p-6 bg-[#fcf9f8]">
      <div className="current_settings mb-10 flex flex-row">
        <div className="current_level flex flex-row gap-2">
        <div className="title_current_level flex items-center mr-4">
          <h1 className="" >Current levels:</h1>
        </div>
          <button
            key="next"
            onClick={(event) => handSetleLevelFilter(event.currentTarget.textContent)}
            className={`${searchParams.get('level') === 'Easy' ? 'bg-[#e8d5ce]': 'bg-[#f4eae7] hover:bg-[#e8d5ce]'} px-4 py-2 text-[#1c110d] rounded-lg disabled:opacity-50`}
          >
            {"Easy"}
          </button>
          <button
            key="next"
            onClick={(event) => handSetleLevelFilter(event.currentTarget.textContent)}
            className={`${searchParams.get('level') === 'Medium' ? 'bg-[#e8d5ce]': 'bg-[#f4eae7] hover:bg-[#e8d5ce]'} px-4 py-2 text-[#1c110d] rounded-lg  disabled:opacity-50`}
          >
            {"Medium"}
          </button>
          <button
            key="next"
            onClick={(event) => handSetleLevelFilter(event.currentTarget.textContent)}
            className={`${searchParams.get('level') === 'Hard' ? 'bg-[#e8d5ce]': 'bg-[#f4eae7] hover:bg-[#e8d5ce]'} px-4 py-2 text-[#1c110d] rounded-lg  disabled:opacity-50`}
          >
            {"Hard"}
          </button>
        </div>
      </div>

      {/* Отображение задач */}
      {tasks.map((task: ITask, idx: number) => (
        <Task key={idx} task={task} handleSetLevelFilter={handSetleLevelFilter}  updateUrlParams={updateUrlParams} idx={idx} />
      ))}

      {/* Пагинация */}
      <div className="flex mt-6 justify-center gap-2">
        {renderPaginationButtons()}
      </div>
      
      {/* Выбор количества задач на странице */}
      <div className="mb-4 mt-5 flex items-center">
        <label htmlFor="itemsPerPage" className="mr-2 text-[#1c110d]">
          Tasks per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-3 py-1 w-[65px] rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};