import React from "react";
import { Carousel } from "antd";

export const TrangChuAdmin = () => {
  // list ảnh banner (dùng link thật của bạn)
  const banners = [
    "https://img.pikbest.com/origin/10/10/31/97vpIkbEsTShb.jpg!w700wp",
    "https://img.pikbest.com/origin/10/10/31/97vpIkbEsTShb.jpg!w700wp",
    "https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-website-anh-bia-Facebook-shop-thoi-trang-quan-ao-7.jpg",
    "https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-website-anh-bia-Facebook-shop-quan-ao-nam-nu-2.jpg",
  ];

  return (
    <div className="container-fluid">
      <Carousel autoplay>
        {banners.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`banner-${index}`}
              style={{
                width: "100%",
                height: "85vh", // chỉnh chiều cao theo ý
                objectFit: "cover", // phủ kín không méo
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
