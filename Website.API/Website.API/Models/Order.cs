using System.ComponentModel.DataAnnotations;

namespace Website.API.Models
{
    public class Order
    {
        [Key]
       public int OrderId { get; set; }
       public int OrderCode { get; set; }
       public string? OrderDescription { get; set; }
        public int TransactionId { get; set; } = 0;
       public int TourId { get; set; }
       public string Email { get; set; }
        public User? User { get; set; }
       public int UserId { get; set; }
       public string PhoneNumber { get; set; }
        public int TotalPeople { get; set; }
        public double TotalPrice { get; set; }
        public string Status { get; set; } = "Đang xử lý";
        public int Refund { get; set; } = 0;
        public DateTime DepartureDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
