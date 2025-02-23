import QuickAccess from "./components/quickAccess";
import SearchBar from "./components/searchBar";
import TaskList from "./components/taskList";
import { CurrentPageProvider } from "./context/currentPage";

export function Tasks() {

  return (
    <CurrentPageProvider>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="mt-8 layout-content-container flex flex-col flex-1">
          <div className="flex flex-col gap-4">
            <h3 className="text-[#1c110d] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Quick access
            </h3>
            <QuickAccess />
            <SearchBar />
          </div>
          <div className="flex flex-col">
            <TaskList />
          </div>
        </div>
      </div>
    </CurrentPageProvider>
  );
}
