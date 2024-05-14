using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly DataContext _context;
        public TourController(DataContext context)
        {
            _context = context;

        }
        [HttpPost]
        public async Task<ActionResult<TourDate>> addTourDate(TourDate date)
        {

                await _context.TourDate.AddAsync(date);
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
