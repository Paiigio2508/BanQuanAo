package com.example.be.util.vnp;


import com.example.be.repository.HoaDonRepository;
import com.example.be.service.ThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/vnppayment")
public class PaymentController {

    @Autowired
    PayService payService;
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    ThanhToanService thanhToanService;

    @Value("${config.public-url:http://localhost:3000}")
    private String publicUrl;

    @GetMapping("/chuyen-khoan/{hoaDon}/{money}")
    public ResponseEntity<?> createPayment(
            @PathVariable("hoaDon") String hoaDon,
            @PathVariable("money") String money,
            @RequestParam(name = "channel", defaultValue = "ADMIN") String channel
    ) throws UnsupportedEncodingException {

        int amount = Integer.parseInt(money) * 100;
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", Config.vnp_Version);
        vnp_Params.put("vnp_Command", Config.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + hoaDon + " - " + vnp_TxnRef);
        vnp_Params.put("vnp_IpAddr", Config.vnp_IpAddr);
        vnp_Params.put("vnp_OrderType", Config.orderType);
        vnp_Params.put("vnp_Locale", Config.vnp_Locale);

        // >>> CHỈ THAY ĐỔI Ở ĐÂY:
        // ADMIN: trả về thẳng trang admin
        // CLIENT: trả về trang client (bạn có thể trỏ tới 1 route FE để tự xử lý success/fail bằng query VNPay)
        String returnPath = "ADMIN".equalsIgnoreCase(channel)
                ? "/admin-thanh-toan-thanh-cong"
                : "/thanh-toan-callback";   // hoặc route FE mà bạn muốn nhận query VNPay
        vnp_Params.put("vnp_ReturnUrl", publicUrl + returnPath);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        vnp_Params.put("vnp_CreateDate", formatter.format(cld.getTime()));
        cld.add(Calendar.MINUTE, 15);
        vnp_Params.put("vnp_ExpireDate", formatter.format(cld.getTime()));

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (Iterator<String> itr = fieldNames.iterator(); itr.hasNext();) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        String queryUrl = query.toString() + "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

        PaymentResDTO paymentResDTO = new PaymentResDTO();
        paymentResDTO.setStatus("OK");
        paymentResDTO.setMessage("success");
        paymentResDTO.setURL(paymentUrl);

        return ResponseEntity.status(HttpStatus.OK).body(paymentResDTO);
    }

    @GetMapping("/thankyou")
    public String thankyou() {
        return "thankyou";
    }

}
