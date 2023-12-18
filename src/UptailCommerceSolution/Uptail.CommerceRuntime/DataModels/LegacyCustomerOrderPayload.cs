using System; 
using System.Runtime.Serialization; 

namespace RequestPayload
{ 
    [DataContract]
    [KnownType(typeof(LegacyCustomerOrderPayload))]
    public class LegacyCustomerOrderPayload
    {
        [DataMember]
        public string CustomerId { get; set; }
    }
}
