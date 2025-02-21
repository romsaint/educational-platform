import { Task } from "./task";

interface PaginationProps {
  tasks: any[];
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

  const totalPages = Math.ceil(quantity / itemsPerPage);
  console.log(tasks)

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
          className={`px-4 py-2 ${
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

  return (
    <div className="p-6 bg-[#fcf9f8]">
      <h1 className="text-3xl font-bold text-[#1c110d] mb-6">Tasks</h1>

      <div className="mb-4 flex items-center">
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

      {tasks.map((task: any, idx: number) => (
        <Task key={idx} {...task} />
      ))}

      <div className="flex justify-center gap-2">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};
