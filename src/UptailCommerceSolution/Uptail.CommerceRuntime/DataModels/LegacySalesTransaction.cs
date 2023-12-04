using System; 
using System.Runtime.Serialization; 

namespace Uptail.CommerceRuntime.DataModels
{ 

    [DataContract]
    public class LegacySalesTransaction
    {    
        [DataMember]
        public string StoreId { get; set; }

        [DataMember]
        public string TransactionId { get; set; }

        [DataMember]
        public DateTime SalesDateTime { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public string ItemNumber { get; set; }

        [DataMember]
        public decimal Quantity { get; set; }

        [DataMember]
        public decimal Price { get; set; }

        [DataMember]
        public decimal Amount { get; set; }
    }
}
