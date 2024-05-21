﻿using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailConfirmed { get; set; } = string.Empty;
        public string? Status { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public List<Tour>? Tour { get; set; }
        public List<FeedBack>? FeedBack { get; set; }

    }
}
