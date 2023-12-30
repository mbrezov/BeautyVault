import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Homepage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  const cat = "parfemi";

  const name = "loreal";

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={`/${cat}`} element={<CategoryPage category={cat} />} />
          <Route path={`/${cat}/${name}`} element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
