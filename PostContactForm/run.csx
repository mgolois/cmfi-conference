#r "Microsoft.WindowsAzure.Storage"
using System.Net;

public static async Task<string> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // Get request body
    var userRegistration = await req.Content.ReadAsAsync<Registration>();
           
    return "";
}
