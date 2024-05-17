using System.ComponentModel.DataAnnotations;

namespace Website.API
{
    public class Image
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public Tour Tour { get; set; }
        public int TourId { get; set; }
    }
}
