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
    }
}
