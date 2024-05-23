using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Website.API.Models
{
    public class UserInfo
    {
        [Key]
        public int UserInfoId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailConfirmed { get; set; } = string.Empty;
        public string? Status { get; set; }
        public string? Role { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        [NotMapped]
        public string Email { get; set; }
    }
}
