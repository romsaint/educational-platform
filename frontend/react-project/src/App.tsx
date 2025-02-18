import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home/home";
import { Wrap } from "./components/wrap";
import { Tasks } from "./pages/tasks/tasks";
import { Signup } from "./pages/registration/registration/registration";

function App() {
  return (
    <Wrap>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/registration" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Wrap>
  );
}

export default App;
