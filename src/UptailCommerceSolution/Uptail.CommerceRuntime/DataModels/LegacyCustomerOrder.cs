using System; 
using System.Runtime.Serialization;

namespace Uptail.CommerceRuntime.DataModels
{ 

    [DataContract]
    public class LegacyCustomerOrder
    {
        [DataMember]
        public decimal Amount { get; set; }

        [DataMember]
        public string Currency { get; set; }

        [DataMember]
        public string Date { get; set; }

        [DataMember]
        public string ItemId { get; set; }

        [DataMember]
        public decimal Price { get; set; }

        [DataMember]
        public decimal Quantity { get; set; }
    }
}
