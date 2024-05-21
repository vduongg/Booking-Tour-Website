
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
        [HttpPost("authentication")]

        public async Task<ActionResult<User>> Authentication(LoginForm user)
        {
          if(user == null)
            {
                return BadRequest();
            }
          var userObj = await _context.Users.FirstOrDefaultAsync(u=> u.Email == user.Email && u.Password == user.Password);
            if(userObj == null)
            {
                return NotFound(new { Message = "User not Found!" });
            }
            return Ok(new {Message = "Login Success!"});
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if(user == null)
            {
                return BadRequest();
            }
            var userObj = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if(userObj == null)
            {
                _context.Users.AddAsync(user);
                _context.SaveChangesAsync();
                return Ok(new { Message = "User Registed!" });
            }
            else
            {
                return Ok(new { Massage = "User exists" });
            }
         
        }

       
    }
}
