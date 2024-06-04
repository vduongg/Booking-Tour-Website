using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

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

             _context.Policy.AddAsync(policy);
            await _context.SaveChangesAsync();
            return Ok(policy);

        }
        [HttpGet]
        public async Task<ActionResult<List<Policy>>> getTourPolicy()
        {

            return Ok(await _context.Policy.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> getTourPolicy(int id)
        {

            return Ok(await _context.Policy.FindAsync(id));
        }
        [HttpPut]
        public async Task<ActionResult<Policy>> updatePolicy(Policy form) 
        {
            var policy = await _context.Policy.FindAsync(form.PolicyId);
            if (policy != null) { 
                policy.PolicyName = form.PolicyName;
                policy.PolicyDescription = form.PolicyDescription;
                _context.Update(policy);
                await _context.SaveChangesAsync();
                return(Ok( new
                {
                    message= "Sửa chính sách thành công!"
                } ));
            }
            return BadRequest();
        }
    }
}
