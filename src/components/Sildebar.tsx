import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCrop,
  FiTrendingUp,
  FiPieChart,
} from "react-icons/fi";
import LogoImg from "../assets/logo.png";
const { Sider, Content } = Layout;

const Sildebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sildeItems = [
    { key: "/", icon: <FiHome />, label: "首頁" },
    { key: "/contacts", icon: <FiUsers />, label: "聯絡人" },
    { key: "/companies", icon: <FiCrop />, label: "公司" },
    { key: "/deals", icon: <FiTrendingUp />, label: "交易" },
    { key: "/reports", icon: <FiPieChart />, label: "報表" },
  ];

  return (
    <div>
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        {/* 左側選單 */}
        <Sider
          width={200}
          style={{ background: "#fff", borderRight: "1px solid #eee" }}
        >
          <div className="flex items-center p-4 text-xl font-bold text-[#4d4d4d]">
            <img src={LogoImg} alt="logo" className="w-10 h-10" />
            CRM
          </div>

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={(item) => navigate(item.key)}
            items={sildeItems}
            style={{
              height: "100%",
              borderRight: 0,
              fontSize: 15,
            }}
          />
        </Sider>

        {/* 主內容 */}
        <Layout style={{ padding: "24px" }}>
          <Content>{/* {children} */}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Sildebar;
