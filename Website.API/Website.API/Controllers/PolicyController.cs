using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly DataContext _context;
        public PolicyController(DataContext context) {
        _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Policy>> addTourPolicy(Policy policy)
        {

            await _context.Policy.AddAsync(policy);
            await _context.SaveChangesAsync();
            return Ok(policy);

        }
        [HttpGet]
        public async Task<ActionResult<List<Policy>>> getTourPolicy()
        {

            return Ok(await _context.Policy.ToListAsync());
        }
    }
}
