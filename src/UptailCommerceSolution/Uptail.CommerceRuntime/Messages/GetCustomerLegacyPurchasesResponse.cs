using Microsoft.Dynamics.Commerce.Runtime.Messages; 
using System.Collections.Generic;
using System.Runtime.Serialization; 
using Uptail.CommerceRuntime.DataModels;

namespace Uptail.CommerceRuntime.Messages
{
    [DataContract]
    public sealed class GetCustomerLegacyPurchasesResponse : Response
    {
        [DataMember]
        public IEnumerable<LegacySalesTransaction> Transactions { get; private set; }

        public GetCustomerLegacyPurchasesResponse(IEnumerable<LegacySalesTransaction> transactions)
        {
            this.Transactions = transactions ?? new List<LegacySalesTransaction>();
        }
    }
}
