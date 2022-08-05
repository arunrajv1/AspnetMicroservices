using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace Patient.API.Model

{
    [Serializable]
    public class Patient
    {
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("first_name")]
        public string first_name { get; set; }
        [JsonProperty("last_name")]
        public string last_name { get; set; }
        [JsonProperty("middle_name")]
        public string middle_name { get; set; }
        public string suffix { get; set; }
        public string birth_sex { get; set; }
        public string date_of_birth { get; set; }
        public string ssn { get; set; }
        public string race { get; set; }
        public string marital_status { get; set; }
        public string employment_status { get; set; }
        public string student_status { get; set; }
        public string deceased { get; set; }
        public PatientAddress address { get; set; }
        public List<PatientMRN> mrn { get; set; }

        public Patient()
        {
            address = new PatientAddress();
            mrn = new List<PatientMRN>();
        }

    }

    [Serializable]
    public class PatientAddress
    {
        public string home_street1 { get; set; }
        public string home_street2 { get; set; }
        public string home_city { get; set; }
        public string home_state { get; set; }
        public string home_postal_code { get; set; }
        public string home_country { get; set; }
        public string home_phone { get; set; }
        public string Work_phone { get; set; }
    }

    [Serializable]
    public class PatientMRN
    {
        public string med_rec_no { get; set; }
        public string medical_facility { get; set; }
    }
}
