namespace Uptail.CommerceRuntime.Triggers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.Dynamics.Commerce.Runtime;
    using Microsoft.Dynamics.Commerce.Runtime.DataModel;
    using Microsoft.Dynamics.Commerce.Runtime.Messages; 

    public class DefinePosExtensionTrigger : IRequestTriggerAsync
    { 
        public IEnumerable<Type> SupportedRequestTypes
        {
            get
            {
                return new[] { typeof(GetExtensionPackageDefinitionsRequest) };
            }
        }
         
        public Task OnExecuted(Request request, Response response)
        {
            ThrowIf.Null(request, "request");
            ThrowIf.Null(response, "response");

            var getExtensionsResponse = (GetExtensionPackageDefinitionsResponse)response;
            var extensionPackageDefinition = new ExtensionPackageDefinition();

            extensionPackageDefinition.Name = "Uptail.Commerce";
            extensionPackageDefinition.Publisher = "Uptail";
            extensionPackageDefinition.IsEnabled = true;

            getExtensionsResponse.ExtensionPackageDefinitions.Add(extensionPackageDefinition);

            return Task.CompletedTask;
        } 

        public Task OnExecuting(Request request)
        {
            return Task.CompletedTask;
        }
    }
}