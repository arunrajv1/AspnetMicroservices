using Patient.API.Model;

namespace Patient.API.Data
{
    public class PatientContextSeed
    {
        public static void SeedData(IEnumerable<Model.Patient> patientCollection)
        {
        //    bool patientExists = patientCollection.Find(p => true).Any();
        //    if (!patientExists)
        //    {
        //        patientCollection.InsertManyAsync(GetPatients());
        //    }
        }

        //private static IEnumerable<Model.Patient> GetPatients()
        //{
        //    return new List<Model.Patient>()
        //   {
        //       new Model.Patient()
        //       {
        //           _id="",
        //           patId = "1",
        //           firstName = "Roger",
        //           lastName = "Federer",
        //           middleName = "RF",
        //           suffix = "King",
        //           homeStreet1 = "No 1",
        //           homeStreet2 = "Switzerland street",
        //           homeCity = "city1",
        //           homeState = "state1",
        //           homePostalCode = "1729212",
        //           homeCountry = "suffix",
        //           homePhone = "12312312312",
        //           workPhone = "23432424324234",
        //           birthSex = "Male",
        //           dateOfBirth = "08/08/1981",
        //           SSN = "1111111",
        //           race = "European",
        //           maritalStatus = "Married",
        //           employmentStatus = "Employed",
        //           studentStatus = "",
        //           deceased = ""
        //       },
        //        new Model.Patient()
        //       {
        //           _id="",
        //           patId = "2",
        //           firstName = "Rafale",
        //           lastName = "Nadal",
        //           middleName = "RN",
        //           suffix = "Nadal",
        //           homeStreet1 = "No 2",
        //           homeStreet2 = "spain street",
        //           homeCity = "Madrid",
        //           homeState = "State 2",
        //           homePostalCode = "17329212",
        //           homeCountry = "suffix",
        //           homePhone = "12312312312",
        //           workPhone = "222222222222",
        //           birthSex = "Male",
        //           dateOfBirth = "03/06/1986",
        //           SSN = "2222222222",
        //           race = "European",
        //           maritalStatus = "Married",
        //           employmentStatus = "Employed",
        //           studentStatus = "",
        //           deceased = ""
        //       }
        //   };
        //}
    }
}
