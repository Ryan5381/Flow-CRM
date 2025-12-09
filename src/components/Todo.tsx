import { Empty, Button } from "antd";

const TodoSection = () => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">待辦事項</h2>

        {/* 之後再接功能 */}
        <Button
          type="primary"
          size="middle"
          style={{ color: "#fff", backgroundColor: "#999" }}
        >
          新增待辦
        </Button>
      </div>

      {/* 內容區：現在先放空狀態，之後再改成列表 */}
      <div className="py-10">
        <Empty description="目前沒有待辦事項" />
      </div>
    </section>
  );
};

export default TodoSection;
