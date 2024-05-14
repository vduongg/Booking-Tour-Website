using System.ComponentModel.DataAnnotations.Schema;

namespace Website.API
{
    public class Tour
    {
        public string TourId { get; set; }

        public string TourName { get; set; }
        public string TourPlace { get; set; }
        public string TourType { get; set; }
        public DateTime DepartureDate { get; set; }
        public string TourPrice { get; set; }
        public string TourDescription { get; set; }
    
        public Policy Policy { get; set; }
        public int PolicyId { get; set; }
        public User User { get; set; }
   
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public string TourStatus { get; set; }
        public List<WishList> WishList { get; set; }
        public List<FeedBack> FeedBacks { get; set; }
    }
}
