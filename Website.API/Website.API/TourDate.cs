using System.ComponentModel.DataAnnotations;

namespace Website.API
{
    public class TourDate
    {
        [Key]
        public int TourDateId { get; set; }
        public int Day { get; set; }
        public int Night { get; set; }
        public List<Tour> tours { get; set; }
    }
}
