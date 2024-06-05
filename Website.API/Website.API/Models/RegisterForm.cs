namespace Website.API.Models
{
    public class RegisterForm
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set;}
        public string Code { get; set; }   
    }
}
