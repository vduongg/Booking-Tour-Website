namespace Website.API.Models
{
    public class FilterForm
    {
        public string? place {  get; set; }
        public string? name { get; set; }
        public string? departureDate { get; set; }
        public List<int>? type { get; set; }
        public int? rate { get; set; }
        public string? price { get; set; }
    }
}
