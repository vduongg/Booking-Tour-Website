using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class WishList
    {
        [Key]
        public int WishListId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public List<Tour> Tours { get; set; }
    }
}
