namespace Website.API.Models
{
    public class UpdateOrderForm
    {
       public int OrderId { get; set; }
       public string Status { get; set; }
       public int Refund { get; set; }
    }
}
