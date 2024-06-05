
using BCrypt.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Website.API.Data;
using Website.API.Models;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace Website.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IMemoryCache _memoryCache;
        private readonly DataContext _context;
        public UserController(DataContext context, IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
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
                if (_memoryCache.TryGetValue(register.Email, out string cachedCode))
                {

                    if (cachedCode == register.Code)
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
                        return BadRequest();
                    }
                }
                else
                    {
                        return BadRequest();
                    }
              
            }
            else
            {
                return Ok(new { Massage = "User exists" });
            }


        }

        [HttpGet("{email}/{password}")]
        public async Task<ActionResult<User>> loginUser(string email, string password)
        {
            if (email == null)
            {
                return BadRequest();
            }
            var userObj = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

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
                        bool verify = BCrypt.Net.BCrypt.Verify(password, userObj.Password);
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
