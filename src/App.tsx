import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/Main/MainPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
