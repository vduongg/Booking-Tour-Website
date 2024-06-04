
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net;
using System.Net.Mail;
using Website.API.Helper;
using Website.API.Models;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;
        public EmailController(IMemoryCache memoryCache) {
            _memoryCache = memoryCache;
        }
        [HttpPost]
        public ActionResult SendEmail(string email)
        {
           MailMessage mailMessage = new MailMessage();
           SmtpClient smtpClient = new SmtpClient();
           mailMessage.From = new MailAddress("conmeokhonnan5@gmail.com");
            mailMessage.To.Add(email);
            mailMessage.Subject = "Noreply-MaXacThucCuaBan" ;
            mailMessage.IsBodyHtml = true;
            var code = new Random().Next(10000,100000);
            _memoryCache.Set(email, code, TimeSpan.FromMinutes(5));
            if (_memoryCache.TryGetValue(email, out int cachedCode))
            {
                Console.WriteLine($"Mã xác thực cho {email} đã được đặt vào bộ nhớ cache: {cachedCode}");
            }
            else
            {
                Console.WriteLine($"Không thể tìm thấy mã xác thực cho {email} trong bộ nhớ cache.");
            }
            mailMessage.Body = "Mã xác thực của bạn sẽ hết sau 5 phút. Mã xác thực của bạn là: " + code;
            smtpClient.Port = 587;
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("conmeokhonnan5@gmail.com", "jdvq rhsx gqli kdcn");
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.Send(mailMessage);
            return Ok(new {message = "Gửi email thành công"});

        }
        [HttpGet()]
        public async Task<ActionResult> confirmEmail(string email,string code)
        {
            if (_memoryCache.TryGetValue(email, out int cachedCode))
            {
                Console.WriteLine($"Mã xác thực cho {email} đã được đặt vào bộ nhớ cache: {cachedCode}");
                return Ok(cachedCode);
            }
            else
            {
                Console.WriteLine($"Không thể tìm thấy mã xác thực cho {email} trong bộ nhớ cache.");
                return BadRequest();
            }
           

        }
    }
}
