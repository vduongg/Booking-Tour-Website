using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class TourType
    {
        [Key]
        public int TourTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Tour>? tours { get; set; }
    }
}
