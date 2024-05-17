﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;

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

            await _context.TourType.AddAsync(tourType);
            await _context.SaveChangesAsync();
            return Ok(tourType);

        }
        [HttpGet]
        public async Task<ActionResult<List<TourType>>> getTourType()
        {

            return Ok(await _context.TourType.ToListAsync());
        }
    }
}
