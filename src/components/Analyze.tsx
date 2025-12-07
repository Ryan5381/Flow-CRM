// 先以寫死的資料顯示，之後再改json
const Analyze = () => {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {/* 左邊：銷售進度卡片 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {/* 標題 */}
        <h2 className="mb-1 text-sm font-medium text-gray-700">銷售進度</h2>

        <p className="text-3xl font-semibold text-gray-900">$120,000</p>
        <p className="mb-4 text-sm text-green-600">本月 +15%</p>

        {/* 圖表區：先佔位，用灰底方塊代表之後放圖表 */}
        <div className="h-40 rounded-lg bg-gray-50" />

        {/* 下方刻度：先假裝有月份 */}
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>1月</span>
          <span>2月</span>
          <span>3月</span>
          <span>4月</span>
          <span>5月</span>
          <span>6月</span>
        </div>
      </div>

      {/* 右邊：本月新增客戶卡片 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-1 text-sm font-medium text-gray-700">本月新增客戶</h2>

        <p className="text-3xl font-semibold text-gray-900">50</p>
        <p className="mb-4 text-sm text-green-600">本月 +20%</p>

        {/* 圖表占位 */}
        <div className="h-40 rounded-lg bg-gray-50" />

        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>1月</span>
          <span>2月</span>
          <span>3月</span>
          <span>4月</span>
          <span>5月</span>
          <span>6月</span>
        </div>
      </div>
    </section>
  );
};

export default Analyze;
