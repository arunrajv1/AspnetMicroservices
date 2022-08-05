using Patient.API.Model;
using Patient.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
namespace Patient.API.Repositories
{
    public class PatientRepository 
    {
        //private readonly IPatientContext _context;

        //public PatientRepository(IPatientContext context)
        //{
        //    _context = context ?? throw new ArgumentNullException(nameof(context));
        //}

        //public async Task<Model.Patient> GetPatient(string patId)
        //{
        //    return await _context.Patients.GetD<Item>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
        //        new FeedOptions { MaxItemCount = 20 });

        //}

        //public async Task<IQueryable<Model.Patient>> GetPatients()
        //{
        //   return await _context.Patients.Find(prop => true);
        //}

        //public async Task<IQueryable<Model.Patient>> GetPatientsByGender(string gender)
        //{
        //    FilterDefinition<Model.Patient> filter = Builders<Model.Patient>.Filter.ElemMatch((object p) => p.birthSex, gender);
        //    return await _context.Patients.Find(filter).ToListAsync();
        //}

        //public async Task<IQueryable<Model.Patient>> GetPatientsByName(string name)
        //{
        //    FilterDefinition<Model.Patient> filter = Builders<Model.Patient>.Filter.Eq((object p) => p.lastName, name);

        //    return await _context.Patients.Find(filter).ToListAsync();
        //}

        //public async Task CreatePatient(Model.Patient patient)
        //{
        //    await _context.Patients.InsertOneAsync(patient);
        //}
        //public async Task<bool> UpdatePatient(Model.Patient patient)
        //{
        //    var updateResult = await _context.Patients.ReplaceOneAsync(filter: g => g._id == patient._id, replacement: patient);

        //    return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        //}

        //public async Task<bool> DeletePatient(string id)
        //{
        //    FilterDefinition<Model.Patient> filter = Builders<Model.Patient>.Filter.Eq((object p) => p.patId, id);
        //    DeleteResult deleteResult = await _context.Patients.DeleteOneAsync(filter);

        //    return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        //}
    }
}
