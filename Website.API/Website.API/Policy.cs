using System.ComponentModel.DataAnnotations;

namespace Website.API
{
    public class Policy
    {
        [Key]
       public int PolicyId { get; set; }

        public string PolicyName { get; set; }
        public string PolicyDescription { get; set; }
        public List<Tour> Tour { get; set; }
   
    }
}
