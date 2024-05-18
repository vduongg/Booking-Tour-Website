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
        public async Task<ActionResult<Tour>> addTour(Tour tour)
        {

                await _context.Tours.AddAsync(tour);
                await _context.SaveChangesAsync();
                return Ok(tour);

        }
        [HttpGet]
        public async Task<ActionResult<List<TourDate>>> getTour()
        {
            
            return Ok(await _context.Tours.ToListAsync());
        }
    }
}
