import Sildebar from "../components/Sildebar";
import Header from "../components/Header";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* 左側邊欄 */}
        <Sildebar />

        {/* 右側主要內容區 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 頂部導航 */}
          <Header />

          {/* 主要內容 */}
          <main className="flex-1 overflow-y-auto p-6">
            <Contacts />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
