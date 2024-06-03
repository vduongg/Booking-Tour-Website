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
            order.OrderCode= vnPayment.OrderId;
            order.PhoneNumber = payments.PhoneNumber;
            order.TourId = payments.TourId;
            order.Email = payments.Email;
            order.DepartureDate = payments.DepartureDate;
            order.OrderDescription = payments.Description;
            order.CreatedDate = vnPayment.CreatedDate;
            order.TotalPeople = payments.TotalPeople;
            order.TotalPrice = payments.TotalPrice;
            order.UserId = 1;
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
                return Ok(new
                {
                    Message =  "Thanh toán thất bại!"
                });
            }
            else
            {
               var order = await _context.Order.Where( o=> o.OrderCode == int.Parse(response.OrderId)).FirstOrDefaultAsync();
                order.TransactionId = int.Parse(response.TransactionId);
                order.Status = "Đã thanh toán";
                _context.Update(order);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    Message = "Thanh toán thành công!"
                });
            }
        }
    }
}
