using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;
using Website.API.Services;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IVnPayService _vpnPayService;

        public PaymentController(DataContext context, IVnPayService vpnPayService)
        {
            _context = context;
            _vpnPayService = vpnPayService;
        }
        [HttpPost]
        public async Task<ActionResult<VnPaymentRequest>> payments(PaymentForm payments)
        {
            var order = new Order();
            var vnPayment = new VnPaymentRequest();
            vnPayment.OrderId = new Random().Next(1000, 100000000);
            vnPayment.FullName = payments.FullName;
            vnPayment.TotalPrice = payments.TotalPrice;
            vnPayment.CreatedDate = DateTime.Now;
            order.OrderId = 0;
            order.FullName = payments.FullName;
            order.OrderCode= vnPayment.OrderId;
            order.PhoneNumber = payments.PhoneNumber;
            order.TourId = payments.TourId;
            order.Email = payments.Email;
            order.DepartureDate = payments.DepartureDate;
            order.OrderDescription = payments.Description;
            order.CreatedDate = vnPayment.CreatedDate;
            order.TotalPeople = payments.TotalPeople;
            order.TotalPrice = payments.TotalPrice;
            order.UserId = payments.UserId;
            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();
            var payUrl = _vpnPayService.CreatePaymentUrl(HttpContext, vnPayment);
            return Ok(new { payUrl });
        }
        [HttpGet]
        public async Task<ActionResult<VnPaymentRequest>> payments()
        {
            var response = _vpnPayService.PaymentExecute(Request.Query);
            if(response == null || response.VnPayResponseCode != "00") 
            {
                var order = await _context.Order.Where(o => o.OrderCode == int.Parse(response.OrderId)).FirstOrDefaultAsync();
                order.Status = "Thanh toán thất bại";
                 _context.Update(order);
                await _context.SaveChangesAsync();
                //Payment?vnp_Amount=15000000&vnp_BankCode=VNPAY&vnp_CardType=QRCODE&vnp_OrderInfo=74185516&vnp_PayDate=20240604161846&vnp_ResponseCode=24
                return Content($"<script>window.open('http://localhost:4200/payments/callback/?vnp_ResponseCode={response.VnPayResponseCode}', " +
                    $"'_blank');</script>", "text/html");
            }
            else
            {
               var order = await _context.Order.Where( o=> o.OrderCode == int.Parse(response.OrderId)).FirstOrDefaultAsync();
                order.TransactionId = int.Parse(response.TransactionId);
                order.Status = "Đã thanh toán";
                _context.Update(order);
                await _context.SaveChangesAsync();
                return Content($"<script>window.open('http://localhost:4200/payments/callback/?vnp_OrderInfo={response.OrderId}&vnp_ResponseCode={response.VnPayResponseCode}&vnp_BankCode=VNPAY&vnp_Amount={order.TotalPrice}&people={order.TotalPeople}&vnp_PayDate={order.CreatedDate}&tourId={order.TourId}', " +
                   $"'_blank');</script>", "text/html");
            }
        }
    }
}
