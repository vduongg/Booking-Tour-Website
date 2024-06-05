
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net;
using System.Net.Mail;
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
        [HttpGet("{email}")]
        public async Task<ActionResult<string>> SendEmail(string email)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                SmtpClient smtpClient = new SmtpClient();
                mailMessage.From = new MailAddress("conmeokhonnan5@gmail.com");
                mailMessage.To.Add(email);
                mailMessage.Subject = "Noreply-MaXacThucCuaBan";
                mailMessage.IsBodyHtml = true;
                var code = new Random().Next(10000, 100000);
                _memoryCache.Set(email, code.ToString(), TimeSpan.FromMinutes(5));
                mailMessage.Body = "Mã xác thực của bạn sẽ hết sau 5 phút. Mã xác thực của bạn là: " + code;
                smtpClient.Port = 587;
                smtpClient.Host = "smtp.gmail.com";
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("conmeokhonnan5@gmail.com", "jdvq rhsx gqli kdcn");
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Send(mailMessage);
                return Ok(new { message = "Thanh cong" });
            }
            catch
            {
                return BadRequest();
            }
          
           

        }

       
    }
}
