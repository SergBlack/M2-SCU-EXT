using Microsoft.Dynamics.Commerce.Runtime.Messages;
using Microsoft.Dynamics.Commerce.Runtime;
using System;
using System.Collections.Generic; 
using System.Threading.Tasks;
using Uptail.CommerceRuntime.Messages;
using Uptail.CommerceRuntime.DataModels;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Linq;
using System.Text;
using System.IO;
using RequestPayload;


namespace Uptail.CommerceRuntime.Services
{
    public class ExtendedCustomerService : IRequestHandlerAsync
    {
        private readonly string _url = "";

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

        private async Task<Response> GetCustomerLegacyPurchasesAsync(GetCustomerLegacyPurchasesRequest request)
        {
            var legacyTransactions = new List<LegacyCustomerOrder>();
            var payload = new LegacyCustomerOrderPayload
            {
                CustomerId = request.CustomerId
            };

            try
            {

                using (var client = new HttpClient())
                {
                    var requestSerializer = new DataContractJsonSerializer(typeof(LegacyCustomerOrderPayload));
                    var responseSerializer = new DataContractJsonSerializer(typeof(List<LegacyCustomerOrder>));

                    using (var memoryStream = new MemoryStream())
                    {
                        requestSerializer.WriteObject(memoryStream, payload);
                        memoryStream.Position = 0;
                        using (var streamReader = new StreamReader(memoryStream))
                        {
                            var jsonPayload = await streamReader.ReadToEndAsync().ConfigureAwait(false);
                            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                            var response = await client.PostAsync(_url, content).ConfigureAwait(false);
                            streamReader.Close();

                            if (response.IsSuccessStatusCode)
                            {
                                var responseJson = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                                using (var responseMemoryStream = new MemoryStream(Encoding.UTF8.GetBytes(responseJson)))
                                {
                                    legacyTransactions = (List<LegacyCustomerOrder>)responseSerializer.ReadObject(responseMemoryStream);
                                    responseMemoryStream.Close();
                                }
                            }

                            content.Dispose();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error:", ex);
            }

            List<LegacySalesTransaction> transactions = legacyTransactions.Select(transaction => new LegacySalesTransaction()
            {
                ItemNumber = transaction.ItemId,
                Amount = transaction.Amount,
                Description = "",
                Price = transaction.Price,
                SalesDateTime = DateTime.Parse(transaction.Date),
                TransactionId = ""
            }).ToList();

            return new GetCustomerLegacyPurchasesResponse(transactions);
        } 
    }
}
