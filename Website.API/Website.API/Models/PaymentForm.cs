namespace Website.API.Models
{
    public class PaymentForm
    {
        public int OrderId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public int TourId { get; set; }
        public int TotalPeople { get; set; }
        public double TotalPrice { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
