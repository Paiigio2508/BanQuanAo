package com.example.be.util;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;

@Component
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void sendEmailPasword(String to, String subject, String password) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            String htmlBody =
                    "<!DOCTYPE html>"
                            + "<html>"
                            + "<head>"
                            + "<meta charset='UTF-8'>"
                            + "<style>"
                            + "body{margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;}"
                            + ".wrapper{width:100%;padding:30px 0;}"
                            + ".card{max-width:420px;margin:0 auto;background-color:#ffffff;"
                            + "border-radius:4px;box-shadow:0 2px 6px rgba(0,0,0,0.1);"
                            + "text-align:center;padding:40px 40px 30px;}"
                            + ".logo-img{display:block;margin:0 auto 20px;width:420px;height:207px;}"
                            + "h1{margin:0 0 20px;font-size:22px;color:#333333;}"
                            + ".info-box{background-color:#f7f7f7;border-radius:4px;"
                            + "padding:25px 20px;margin-bottom:20px;}"
                            + ".label{font-size:13px;color:#666666;margin-bottom:5px;}"
                            + ".value{font-size:20px;letter-spacing:1px;color:#111111;}"
                            + "</style>"
                            + "</head>"
                            + "<body>"
                            + "<div class='wrapper'>"
                            + "  <div class='card'>"
                            + "    <img class='logo-img' src='cid:logoImage' alt='TSPORT Logo' />"
                            + "    <h1>Mật Khẩu Mới</h1>"
                            + "    <div class='info-box'>"
                            + "      <div class='label'>Tài khoản</div>"
                            + "      <div class='value'>" + to + "</div>"
                            + "      <div class='label' style='margin-top:15px;'>Mật khẩu</div>"
                            + "      <div class='value'>" + password + "</div>"
                            + "    </div>"
                            + "    <p style='font-size:12px;color:#999999;line-height:1.5;margin-top:15px;'>"
                            + "        Mật khẩu của bạn đã thay đổi. Vui lòng không chia sẻ cho bất kỳ ai."
                            + "    </p>"
                            + "  </div>"
                            + "</div>"
                            + "</body>"
                            + "</html>";
            helper.setFrom(sender);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            ClassPathResource logo = new ClassPathResource("images/logo1.png");
            helper.addInline("logoImage", logo);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}