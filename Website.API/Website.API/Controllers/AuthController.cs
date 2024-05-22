using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Website.API.Data;
using Website.API.Models;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        public AuthController(DataContext context)
        {

            _context = context;
        }
        [HttpPost("authentication")]

        public async Task<ActionResult<User>> Authentication(LoginForm user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (userObj == null)
            {
                return NotFound(new { Message = "User not Found!" });
            }
            else
            {

                bool verify = BCrypt.Net.BCrypt.Verify(user.Password, userObj.Password);
                if (verify)
                {
                    var userTemp = await _context.UserInfo.FirstOrDefaultAsync(i => i.UserId == userObj.UserId);
                    userObj.Token = CreateJwt(userTemp);
                    return Ok(new
                    {
                        Token = userObj.Token,
                        Message = "Login Success!"
                    });
                }
                else
                {
                    return BadRequest(new { Message = "Wrong password!" });
                }
            }


        }
        
        private string CreateJwt(UserInfo userinfo)
        {
            var jwtTokenHandle = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("thekeyveryveryverysecret........");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, userinfo.Role),
                new Claim(ClaimTypes.Name,$"{userinfo.FirstName} {userinfo.LastName}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandle.CreateToken(tokenDescriptor);
            return jwtTokenHandle.WriteToken(token);
        }
    }
}
