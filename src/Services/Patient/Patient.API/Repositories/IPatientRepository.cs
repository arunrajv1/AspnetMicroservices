using Patient.API.Model;
namespace Patient.API.Repositories
{
    public interface IPatientRepository
    {
        Task<IQueryable<Model.Patient>> GetPatients();
        Task<Model.Patient> GetPatient(string id);
        Task<IQueryable<Model.Patient>> GetPatientsByName(string name);
        Task<IQueryable<Model.Patient>> GetPatientsByGender(string gender);
        Task CreatePatient(Model.Patient patient);
        Task<bool> UpdatePatient(Model.Patient patient);
        Task<bool> DeletePatient(string id);
    }
}
