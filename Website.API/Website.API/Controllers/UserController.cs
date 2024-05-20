
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context) {
        
            _context = context;
        }
        [HttpGet]

        public async Task<ActionResult<User>> getUser( int userId)
        {
           var user = await _context.Users.FindAsync(userId);
            return user == null ? NotFound() : Ok(user);
        }
       
    }
}
