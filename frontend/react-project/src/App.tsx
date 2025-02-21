import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home/home";
import { Wrap } from "./components/wrap";
import { Tasks } from "./pages/tasks/tasks";
import { Signup } from "./pages/registration/registration/registration";
import { Login } from "./pages/registration/login/login";
import { ErrorContextProvider } from "./components/context/error.context";
import { Task } from "./pages/task/task";

function App() {
  return (
    <ErrorContextProvider>
      <Wrap>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/registration" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task/:id" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </Wrap>
    </ErrorContextProvider>
  );
}

export default App;
