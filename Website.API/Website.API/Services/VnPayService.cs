using Website.API.Models;

namespace Website.API.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _config;
        public VnPayService(IConfiguration config) {
            _config = config;
        }
        public string CreatePaymentUrl(HttpContext context, VnPaymentRequest model)
        {
            var tick = DateTime.Now.Ticks.ToString();
            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:Tmncode"]);
            vnpay.AddRequestData("vnp_Amount", (model.TotalPrice * 100).ToString());
            vnpay.AddRequestData("vnp_CreateDate", model.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);

            vnpay.AddRequestData("vnp_OrderInfo", model.OrderId.ToString());
            vnpay.AddRequestData("vnp_OrderType","other "); 
            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:ReturnUrl"]);
            vnpay.AddRequestData("vnp_TxnRef",model.OrderId.ToString());

            var paymentUrl = vnpay.CreateRequestUrl(_config["Vnpay:BaseUrl"], _config["Vnpay:HashSecret"]);
            return paymentUrl;
        }

        public VnPaymentResponse PaymentExecute(IQueryCollection collection)
        {
            var vnpay = new VnPayLibrary();
            foreach (var(key, value) in collection) 
            {
                if(!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }
            var vnp_orderId = vnpay.GetResponseData("vnp_TxnRef");
            var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
            var vnp_SecureHash = collection.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
            var vpn_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vpn_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");

            bool checkSignture = vnpay.ValidateSignature(vnp_SecureHash, _config["Vnpay:HashSecret"]);
            if(!checkSignture)
            {
                return new VnPaymentResponse
                {
                    Success = false,
                };
            }
            else
            {
                return new VnPaymentResponse
                {
                    Success = true,
                    PaymentMethod = "VnPay",
                    OrderDesciption = vpn_OrderInfo,
                    OrderId = vnp_orderId,
                    TransactionId = vnp_TransactionId.ToString(),   
                    token = vnp_SecureHash,
                    VnPayResponseCode = vpn_ResponseCode,
                  
                };
            }
        }
    }
}
