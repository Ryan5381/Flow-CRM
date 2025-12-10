import Sidebar from "../components/Sildebar";
import Header from "../components/Header";
import Analyze from "../components/Analyze";
import RecentActivity from "../components/RecentActivity";
import Todo from "../components/Todo";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* 左側邊欄 */}
        <Sidebar />

        {/* 右側主要內容區 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 頂部導航 */}
          <Header />

          {/* 主要內容 */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-7xl">
              {/* 歡迎卡片 */}
              <div className="mb-6 rounded-lg bg-white  shadow-sm">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                  歡迎使用 Flow CRM
                </h1>
                <p className="text-gray-600">管理您的客戶關係,提升業務效率</p>
              </div>
              <Analyze />
              <RecentActivity />
              <Todo />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
