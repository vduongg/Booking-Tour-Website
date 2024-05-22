using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; }
        public string? ImageURL { get; set; }
        public Tour? Tour { get; set; }
        public int? TourId { get; set; }
    }
}
