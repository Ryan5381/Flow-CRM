import Sildebar from "../components/Sildebar";
import Header from "../components/Header";
import Companies from "../components/Companies";
import Footer from "../components/Footer";

const CompanyPage = () => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sildebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-7xl">
              <Companies />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyPage;
