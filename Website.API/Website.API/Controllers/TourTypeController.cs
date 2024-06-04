using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourTypeController : ControllerBase
    {
        private readonly DataContext _context;
        public TourTypeController(DataContext context) {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<TourType>> addTourType(TourType tourType)
        {

             _context.TourType.AddAsync(tourType);
            await _context.SaveChangesAsync();
            return Ok(tourType);

        }
        [HttpGet]
        public async Task<ActionResult<List<TourType>>> getTourType()
        {

            return Ok(await _context.TourType.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<List<TourType>>> getTourType(int id)
        {

            return Ok(await _context.TourType.FindAsync(id));
        }
        [HttpPut]
        public async Task<ActionResult<TourType>> updateTourType( TourType tourType)
        {
            var type = await _context.TourType.FindAsync(tourType.TourTypeId);
            if (type != null) {
                type.Name = tourType.Name;
                type.Description = tourType.Description;
                _context.Update(type);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa loại tour thành công!" });
            }
            return BadRequest();
        }

    }
}
