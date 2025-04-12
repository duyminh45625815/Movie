import React from "react";

const PromotionDetail = () => {
  const promo = {
    title: "Mua 1 Tặng 1 Vé Xem Phim",
    description: "Áp dụng cho tất cả các rạp vào thứ 3 hàng tuần.",
    extraDescription:
      "Từ 01.04.2025, Galaxy Cinema chính thức ra mắt Combo ưu tiên chỉ dành riêng cho các Stars từ 13 đến 22 tuổi. " +
      "Đến Galaxy Cinema, thưởng thức loạt phim hay và mua ngay Combo 1 U22 đủ bắp giòn nước ngọt chỉ từ 49k. " +
      "Muốn thêm phần nước, hãy chọn Combo 2 U22 chỉ từ 59k. " +
      "Và đừng quên, Galaxy Cinema cũng có giá vé ưu đãi khủng dành cho các Stars U22 tại ĐÂY!",
    conditions: [
      "Chỉ áp dụng cho thành viên.",
      "Không áp dụng cùng các ưu đãi khác.",
      "Ưu đãi có giới hạn, nhanh tay nhận ngay!",
    ],
    validity: "Hạn sử dụng: 31/12/2025",
    image: "/promotion_cgv.jpg",
    banner: "/ads_banner.jpg",
  };

  return (
    <div className="flex justify-center gap-6 items-start">
      <div className="max-w-3xl p-6 bg-white shadow-md rounded-lg flex gap-6">
        <div className="w-1/3">
          <img src={promo.image} alt={promo.title} className="w-full rounded-md" />
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">{promo.title}</h1>
          <p className="text-gray-700 mt-2">{promo.description}</p>
          <p className="text-gray-700 mt-2">{promo.extraDescription}</p>
          <h3 className="text-lg font-semibold mt-4">Điều kiện áp dụng:</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            {promo.conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
          <p className="text-red-500 font-semibold mt-3">{promo.validity}</p>
          <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Nhận ưu đãi ngay
          </button>
        </div>
      </div>
      <div className="w-1/4">
        <img src={promo.banner} alt="Banner quảng cáo" className="w-full rounded-md shadow-md" />
      </div>
    </div>
  );
};

export default PromotionDetail;
