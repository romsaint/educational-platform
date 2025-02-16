import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home/home";
import { Wrap } from "./components/wrap";
import { Tasks } from "./pages/tasks/tasks";

function App() {
  return (
    <Wrap>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </Wrap>
  );
}

export default App;
