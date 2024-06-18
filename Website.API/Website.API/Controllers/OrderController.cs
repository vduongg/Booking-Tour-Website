using MailKit.Search;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;
        public OrderController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<Order>> listOrder()
        {

            return Ok(await _context.Order.ToListAsync());

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> listOrder(int id)
        {

            var order = await _context.Order.Where(o => o.UserId == id).ToListAsync();
            return Ok(order);

        }
        [HttpPut()]
        public async Task<ActionResult<Order>> updateOrder(UpdateOrderForm form)
        {
            var order = await _context.Order.Where(o=>o.OrderId == form.OrderId).FirstOrDefaultAsync();
            if(order != null && form.Refund != null) {
                if(form.Status == "Hoàn tiền")
                {
                    order.Status = form.Status;
                    order.Refund = form.Refund;
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                    return Ok(order);
                }
                else
                {
                    order.Status = form.Status;
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                    return Ok(order);
                }
               
            }
            return BadRequest();
        }
        [HttpGet("GetTop")]
        public async Task<ActionResult<Tour[]>> getTopTour()
        {
            var topTours = _context.Order
                .GroupBy(o => o.TourId)
                .Select(g => new OrderStatistics
                {
                    TourId = g.Key,
                    OrderCount = g.Count()
                })
                .OrderByDescending(stat => stat.OrderCount)
                .Take(8)
                .ToList();

            return Ok(topTours);
        }

    }

    internal class OrderStatistics
    {
        public object TourId { get; set; }
        public int OrderCount { get; set; }
    }
}
