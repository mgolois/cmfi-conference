#r "Microsoft.Azure.WebJobs.Extensions.SendGrid"
using SendGrid.Helpers.Mail;    
using System.Net;

public static string Run(HttpRequestMessage req, out Mail message, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // Get request body
    var contact = req.Content.ReadAsAsync<ContactRequest>().Result;
    
    var personalization = new Personalization();
    personalization.AddTo(new Email(contact.EmailAddress));
    personalization.AddTo(new Email("webmaster@cmfimaryland.com"));
    
    var messageContent = new Content("text/html", 
                                    "<h1>CMFI Maryland - Conference Registration</h1>" +
                                    contact.ToHtmlString());
    message = new Mail();
    message.AddContent(messageContent);
    message.AddPersonalization(personalization);
    
    return "Success";
}

public class ContactRequest
{
    public string EventName {get;set;}
    public string FirstName {get;set;}
    public string LastName {get;set;}
    public string EmailAddress {get;set;}
    public string Phone {get;set;}
    public string Comments {get;set;}
    
    public string ToHtmlString()
    {
        return @"<table>
        <tr>
            <td>EventName:</td><td>" + EventName+  @"</td>
        </tr>
        <tr>
            <td>FirstName:</td><td>" + FirstName+  @"</td>
        </tr>
        <tr>
            <td>LastName:</td><td>" + LastName+  @"</td>
        </tr>
        <tr>
            <td>EmailAddress:</td><td>" + EmailAddress+  @"</td>
        </tr>
        <tr>
            <td>Phone:</td><td>" + Phone+  @"</td>
        </tr>
        <tr>
            <td>Comments:</td><td>" + Comments+  @"</td>
        </tr>
            </table>";
    }
}
