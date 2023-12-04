using Microsoft.Dynamics.Commerce.Runtime.DataModel;
using Microsoft.Dynamics.Commerce.Runtime.Hosting.Contracts;
using Microsoft.Dynamics.Commerce.Runtime; 
using System.Collections.Generic;
using Uptail.CommerceRuntime.DataModels;
using System.Threading.Tasks;
using Uptail.CommerceRuntime.Messages; 

namespace Uptail.CommerceRuntime.Controllers
{ 
    public class ExtendedCustomersController : IController
    { 
        [HttpPost]
        [Authorization(CommerceRoles.Device, CommerceRoles.Employee, CommerceRoles.Application)]
        public async Task<IEnumerable<LegacySalesTransaction>> UptailSearchLegacyPurchases(IEndpointContext context, string customerAccountId)
        {
            ThrowIf.Null(customerAccountId, "customerAccountId"); 

            var request = new GetCustomerLegacyPurchasesRequest(customerAccountId);
            var response = await context.ExecuteAsync<GetCustomerLegacyPurchasesResponse>(request).ConfigureAwait(false);

            return response.Transactions;
        }
    }
}
