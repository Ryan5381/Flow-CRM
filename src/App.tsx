import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ConfigProvider } from "antd";

function App() {
  const Homepage = lazy(() => import("./views/Homepage"));
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverBg: "#e8e8e8",
            itemActiveBg: "#e8e8e8",
            itemColor: "#666",
            itemHoverColor: "#666",
            // itemBg: "#e8e8e8",
            itemSelectedColor: "#666",
            itemSelectedBg: "#e8e8e8",
          },
          Table: {
            headerBg: "#E8E8E8",
            headerBorderRadius: 1,
          },
        },
      }}
    >
      <HashRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
