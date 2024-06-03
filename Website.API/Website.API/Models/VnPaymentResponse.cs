namespace Website.API.Models
{
    public class VnPaymentResponse
    {
        public bool Success { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderDesciption { get; set; }
        public string OrderId { get; set; }
        public string PaymentId { get; set; }
        public string TransactionId {  get; set; }
        public string token { get; set; }
        public string VnPayResponseCode { get; set; }
    }
    public class VnPaymentRequest
    {
        public int OrderId { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public double TotalPrice { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
