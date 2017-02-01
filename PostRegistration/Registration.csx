#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;

public class Registration : TableEntity
{
    public string EventName {get; set;}
    public string FirstName { get; set; }
    public string LastName  { get; set; }
    public string EmailAddress  { get; set; }
    public string Phone  { get; set; }
    public string NumberOfAdults  { get; set; }
    public string NumberOfChildren  { get; set; }
    public string Address  { get; set; }
    public string State  { get; set; }
    public string City  { get; set; }
    public string Country  { get; set; }
    public string Transportation  { get; set; }
    public string ChurchName  { get; set; }
    public string Sessions  { get; set; }
    public string Comments  { get; set; }
    public System.DateTime RegistrationDate {get; set;}

    public override string ToString()
    {
        return $"{FirstName} {LastName} - {RegistrationDate}";
    }
}
