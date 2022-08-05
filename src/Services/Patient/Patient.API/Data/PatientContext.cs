using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
namespace Patient.API.Data
{
    public class PatientContext : IPatientContext
    {
        public PatientContext(IConfiguration configuration)
        {
            var url = configuration.GetValue<string>("DatabaseSettings:ConnectionString");
            var key = configuration.GetValue<string>("DatabaseSettings:Key");
            var dbName = configuration.GetValue<string>("DatabaseSettings:DBName");
            var containerName = configuration.GetValue<string>("DatabaseSettings:Container");
            IDocumentClient dbClient = new DocumentClient(new Uri(url), key);
            dbClient.CreateDatabaseIfNotExistsAsync(new Database { Id= dbName});
            dbClient.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(dbName),new DocumentCollection { Id="Items"});

            //Patients = dbClient.cReateD
        }

        public Task<IEnumerable<Model.Patient>> Patients { get;}
    }
}
