import { requestAdress } from "../../helper/request";

export class ShipAPI {
    static fetchAllProvince = () => {
        return requestAdress({
          method: "GET",
          headers: {
            token: "d73043b1-2777-11ee-b394-8ac29577e80e",
          },
          url: `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        });
      };
      static fetchAllProvinceDistricts = (codeProvince) => {
        return requestAdress({
          method: "GET",
          headers: {
            token: "d73043b1-2777-11ee-b394-8ac29577e80e",
          },
          url: `  https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
          params: { province_id: codeProvince },
        });
      };
      static fetchAllProvinceWard = (codeDistrict) => {
        return requestAdress({
          method: "GET",
          headers: {
            token: "d73043b1-2777-11ee-b394-8ac29577e80e",
          },
          url: ` https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
          params: { district_id: codeDistrict },
        });
      };
    
      static fetchAllMoneyShip = (to_district_id, to_ward_code, quantity) => {
        const q = Number(quantity);

        // nếu q không phải số, hoặc <= 0 thì lấy 1
        const quantityProducts = !q || q <= 0 ? 1 : q;
    
        return requestAdress({
          method: "GET",
          headers: {
            token: "d73043b1-2777-11ee-b394-8ac29577e80e",
            shop_id: "4374133",
          },
          url: ` https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
          params: {
            service_type_id: 2,
            insurance_value: "",
            coupon: "",
            from_district_id: 1485,
            to_district_id: to_district_id,
            to_ward_code: to_ward_code,
            height: 11 * quantityProducts,
            length: 28,
            weight: 300 * quantityProducts,
            width: 16,
          },
        });
      };
      static fetchAllDayShip = (to_district_id, to_ward_code) => {
        return requestAdress({
          method: "GET",
          headers: {
            token: "d73043b1-2777-11ee-b394-8ac29577e80e",
            shop_id: "4374133",
          },
          url: `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime`,
          params: {
            from_district_id: 1485,
            from_ward_code: "1A0607",
            to_district_id: to_district_id,
            to_ward_code: to_ward_code,
            service_id: 53320,
          },
        });
      };
}