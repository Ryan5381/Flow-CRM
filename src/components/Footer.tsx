const Footer = () => {
  return (
    <div className="flex justify-between bg-[#f2f2f2] min-h-15">
      <p className="ml-5 p-2 text-center flex items-center text-lg font-medium text-[#a3a3a3]">
        © 2025 Flow CRM. 版權所有。
      </p>

      <div className="mr-5 flex items-center gap-3 text-lg text-[#a3a3a3]">
        <p>隱私權政策</p>
        <p>服務條款</p>
        <p>聯絡我們</p>
      </div>
    </div>
  );
};

export default Footer;
