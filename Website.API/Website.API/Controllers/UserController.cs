
using BCrypt.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {

            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<RegisterForm>> Register(RegisterForm register)
        {
            if (register == null)
            {
                return BadRequest();
            }
            var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Email == register.Email);
            if (userObj == null)
            {
                var user = new User();
                user.Token = "";
                user.Email = register.Email;
                user.Password = BCrypt.Net.BCrypt.HashPassword(register.Password);
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                var id = (await _context.Users.Where(u => u.Email == user.Email).FirstOrDefaultAsync());
                if (id != null)
                {
                    var userInfo = new UserInfo();
                    userInfo.UserId = id.UserId;
                    userInfo.FirstName = register.FirstName;
                    userInfo.LastName = register.LastName;
                    userInfo.Status = "running";
                    userInfo.PhoneNumber = register.PhoneNumber;
                    userInfo.Role = "User";
                    await _context.UserInfo.AddAsync(userInfo);
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    Message = "User Registed!"
                });
            }
            else
            {
                return Ok(new { Massage = "User exists" });
            }


        }
        [HttpGet]
        public async Task<ActionResult<List<UserInfo>>> getAllUserInfo()
        {
            var userInfo = await _context.UserInfo.ToListAsync();
            if(userInfo != null)
            {
                for (int i = 0; i < userInfo.Count(); i++)
                {
                    var email = await _context.Users.FindAsync(userInfo[i].UserId);
                    userInfo[i].Email = email.Email;
                }
                return Ok(userInfo);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
