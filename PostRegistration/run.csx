#r "Microsoft.WindowsAzure.Storage"
#load "Registration.csx"
using System.Net;
using System.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.Azure;


public static async Task<string> Run(HttpRequestMessage req, CloudTable tableBinding, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // Get request body
    var userRegistration = await req.Content.ReadAsAsync<Registration>();

    //set required fields
    userRegistration.RegistrationDate = System.DateTime.Now;
    userRegistration.Timestamp = userRegistration.RegistrationDate;
    userRegistration.PartitionKey = userRegistration.EventName;
    userRegistration.RowKey = Guid.NewGuid().ToString();
    
    TableOperation operation = TableOperation.Insert(userRegistration);
    var result = tableBinding.Execute(operation);
            
    return userRegistration.ToString();
}
