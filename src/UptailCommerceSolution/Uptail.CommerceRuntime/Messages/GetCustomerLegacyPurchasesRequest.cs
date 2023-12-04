using Microsoft.Dynamics.Commerce.Runtime.Messages;
using Microsoft.Dynamics.Commerce.Runtime; 
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Uptail.CommerceRuntime.Messages
{ 
    [DataContract]
    public sealed class GetCustomerLegacyPurchasesRequest : Request
    {
        [DataMember, Required]
        public string CustomerId { get; set; }

        public GetCustomerLegacyPurchasesRequest(string customerId)
        {
            ThrowIf.NullOrWhiteSpace(customerId, "customerId");
            this.CustomerId = customerId;
        }
    }
}
