import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Components/styles/bg-animations.css";
import Main from "./Components/Main/Main";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
