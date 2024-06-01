using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Website.API.Models
{
    public class Tour
    {
        [Key]
        public int TourId { get; set; }

        public string? TourName { get; set; }
        public string? TourPlace { get; set; }
        public int? TourTypeId { get; set; }
        public TourType? TourType { get; set; } = null;
        public TourDate? TourDate { get; set; } = null;
        public int? TourDateId { get; set; }
        public DateTime? DepartureDate { get; set; }
        public int? TourPrice { get; set; }
        public string? TourDescription { get; set; }

        public Policy? Policy { get; set; } = null;
        public int? PolicyId { get; set; }
        public User? User { get; set; } = null;

        public int? UserId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? TourStatus { get; set; }
        public List<Image>? Image { get; set; } = null;
        public List<WishList>? WishList { get; set; } = null;
        public List<FeedBack>? FeedBacks { get; set; } = null;
    }
}
