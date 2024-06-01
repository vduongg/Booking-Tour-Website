using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

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
        [HttpGet("{id}")]
        public async Task<ActionResult<List<TourDate>>> getTour(int id)
        {

            return Ok(await _context.Tours.FindAsync(id));
        }
        [HttpGet("LastTour/{id}")]
        public async Task<ActionResult<List<TourDate>>> getLastTour(int id)
        {

            return Ok(await _context.Tours.Where(t => t.UserId == id).OrderByDescending(e => e.TourId).FirstOrDefaultAsync());
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Tour>> editTour(int id, Tour tour)
        {
            
            var tourItem = _context.Tours.Find(id);
            tourItem.TourId = tour.TourId;
            tourItem.UserId = tour.UserId;
            tourItem.TourPrice = tour.TourPrice;
            tourItem.PolicyId = tour.PolicyId;  
            tourItem.TourDateId = tour.TourDateId;
            tourItem.DepartureDate = tour.DepartureDate;
            tourItem.TourTypeId = tour.TourTypeId;
            tourItem.TourPlace = tour.TourPlace;
            tourItem.TourName = tour.TourName;
            tourItem.TourDescription = tour.TourDescription;
            _context.SaveChanges();

            
            return Ok(tourItem);
        }

    }
}
