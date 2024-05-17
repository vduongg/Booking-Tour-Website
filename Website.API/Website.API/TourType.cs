using System.ComponentModel.DataAnnotations;

namespace Website.API
{
    public class TourType
    {
        [Key]
        public int TourTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
