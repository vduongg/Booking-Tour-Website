using MailKit.Search;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly DataContext _context;
        public StatisticController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{year}")]
        public async Task<ActionResult> getRevenueYear(int year)
        {
            var revenueYear = _context.Order.Where( o=> o.CreatedDate.Year == year).
                GroupBy(o => new { o.CreatedDate.Month })
               .Select(g => new
               {
           
                   Month = g.Key.Month,
                   TotalRevenue = g.Sum(o => o.Refund == 0 ? o.TotalPrice : o.TotalPrice - o.TotalPrice * (o.Refund / 100.0))
               })
               .OrderBy(g => g.Month);
            return Ok(revenueYear);
        }

    }
}
