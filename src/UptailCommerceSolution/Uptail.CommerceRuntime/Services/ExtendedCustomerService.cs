using Microsoft.Dynamics.Commerce.Runtime.Messages;
using Microsoft.Dynamics.Commerce.Runtime;
using System;
using System.Collections.Generic; 
using System.Threading.Tasks;
using Uptail.CommerceRuntime.Messages;
using Uptail.CommerceRuntime.DataModels;

namespace Uptail.CommerceRuntime.Services
{
    public class ExtendedCustomerService : IRequestHandlerAsync
    {
        public IEnumerable<Type> SupportedRequestTypes
        {
            get => new[] { typeof(GetCustomerLegacyPurchasesRequest) };
        }

        public async Task<Response> Execute(Request request)
        {
            ThrowIf.Null(request, nameof(request));

            switch (request)
            {
                case GetCustomerLegacyPurchasesRequest getLegacyPurchasesRequest:
                    return await GetCustomerLegacyPurchasesAsync(getLegacyPurchasesRequest).ConfigureAwait(false);
                default:
                    throw new NotSupportedException($"Request '{request.GetType()}' is not supported.");
            }
        }

        private Task<Response> GetCustomerLegacyPurchasesAsync(GetCustomerLegacyPurchasesRequest request)
        {
            var transactions = new List<LegacySalesTransaction>
            {
                new LegacySalesTransaction() { ItemNumber = "00020", Amount = 100, Description = "Test", Price = 10, TransactionId = "RS_001", SalesDateTime = DateTime.Now.AddDays(-120)  },
                new LegacySalesTransaction() { ItemNumber = "00022", Amount = 2100, Description = "Test", Price = 30, TransactionId = "RS_002" },
                new LegacySalesTransaction() { ItemNumber = "03020", Amount = 300, Description = "Test", Price = 430, TransactionId = "RS_003" },
                new LegacySalesTransaction()
                {
                    ItemNumber = "00032",
                    Amount = 400,
                    Description = "Test",
                    Price = 10,
                    SalesDateTime = DateTime.Now.AddDays(-200),
                    TransactionId  = "RS_004"
                }
            };

            return Task.FromResult<Response>(new GetCustomerLegacyPurchasesResponse(transactions));
        } 
    }
}
