import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ConfigProvider } from "antd";

function App() {
  const Homepage = lazy(() => import("./views/Homepage"));
  const Login = lazy(() => import("./views/Login"));
  const Register = lazy(() => import("./views/Register"));
  const ContactPage = lazy(() => import("./views/ContactPage"));
  const CompanyPage = lazy(() => import("./views/CompanyPage"));

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
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              載入中...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/companies" element={<CompanyPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
