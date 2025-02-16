import QuickAccess from "./components/quickAccess";
import SearchBar from "./components/searchBar";
import SortingButtons from "./components/sortingButtons";
import TaskList from "./components/taskList";

export function Tasks() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="mt-20 layout-content-container flex flex-col flex-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-[#1c110d] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Quick access
          </h3>
          <QuickAccess />
          <SearchBar />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center px-4 pb-3 pt-5">
            <h2 className="text-[#1c110d] text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Tasks
            </h2>
            <SortingButtons />
          </div>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
