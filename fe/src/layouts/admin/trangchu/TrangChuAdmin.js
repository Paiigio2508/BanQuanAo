import React from "react";
import { Carousel } from "antd";

export const TrangChuAdmin = () => {
  // list ảnh banner (dùng link thật của bạn)
  const banners = [
    "https://www.10wallpaper.com/wallpaper/1920x1080/1212/Nike_logo_-_the_global_brand_advertising_wallpaper_05_1920x1080.jpg",
    "https://cdn.wallpapersafari.com/71/92/SLVR9a.jpg",
    "https://kicksology.ca/cdn/shop/files/LINING_TITLE_BANNER.jpg?crop=center&height=1080&v=1757619690&width=1920",
    "https://wallpapers.com/images/hd/puma-logo-in-mint-green-ugzqhxqamdq85i0a.jpg",
  ];

  return (
    <div className="container-fluid">
      <Carousel autoplay autoplaySpeed={4000}>
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
