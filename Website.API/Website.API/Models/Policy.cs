using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class Policy
    {
        [Key]
        public int PolicyId { get; set; }

        public string PolicyName { get; set; }
        public string PolicyDescription { get; set; }
    
    }
}
