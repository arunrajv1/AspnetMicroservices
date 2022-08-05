using Microsoft.Azure.Cosmos;
using Patient.API.Model;
namespace Patient.API.Data
{
    public interface IPatientContext
    {
        Task<IEnumerable<Model.Patient>> Patients { get; }

    }
}   
