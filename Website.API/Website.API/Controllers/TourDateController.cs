using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourDateController : ControllerBase
    {
        private readonly DataContext _context;
        public TourDateController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<TourDate>> addTourDate(TourDate date)
        {

             _context.TourDate.AddAsync(date);
            await _context.SaveChangesAsync();
            return Ok(date);

        }
        [HttpGet]
        public async Task<ActionResult<List<TourDate>>> getTourDate()
        {

            return Ok(await _context.TourDate.ToListAsync());
        }
    }
}
