using Microsoft.AspNetCore.Authorization;
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
                var status = await _context.UserInfo.FirstOrDefaultAsync(u => u.UserId == userObj.UserId);
                if(status != null)
                {
                    if (status.Status == "on")
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
                    else
                    {
                        return BadRequest(new { Message = "Accounts blocked" });
                    }
                }
                else
                {
                    return BadRequest();
                }
               
            }


        }
        [Authorize]
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
                    userInfo.Status = "on";
                    userInfo.PhoneNumber = register.PhoneNumber;
                    userInfo.Role = register.Role;
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
        [HttpGet("{id}")]
        public async Task<ActionResult> editStatusUser(int id)
        {
            var user = await _context.UserInfo.FindAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            else
            {
                if(user.Status == "on")
                {
                    user.Status = "off";
                   await _context.SaveChangesAsync();
                    return Ok(new { Message = "Off" });
                }
                if(user.Status == "off")
                {
                    user.Status = "on";
                    await _context.SaveChangesAsync();
                    return Ok(new { Message = "On" });
                }
                return BadRequest();
               
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
