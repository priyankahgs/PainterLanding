using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;


namespace PainterLanding.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
       
        public ActionResult HindiPageRedirect()
        {
            return View("Index_Hindi");
        }
       
        public ActionResult EnglishPageRedirect()
        {
            return View("Index");
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public JsonResult InsertData(String Name, String Telephone, String Pincode, String City, string State , string PreferredLanguage, string IsAssociated, String Campaign, String Source, String Medium, string PreviousUrl)
        {
            try
            {
                string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["bergerConnectionString"].ConnectionString;

                SqlConnection cnn = new SqlConnection(cnnString);
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cnn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "PainterLandingInsert";
                cmd.Parameters.Add("@ReturnVal", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
                cmd.Parameters.Add("@Telephone", SqlDbType.VarChar).Value = Telephone;
                cmd.Parameters.Add("@Pincode", SqlDbType.VarChar).Value = Pincode;
                cmd.Parameters.Add("@City", SqlDbType.VarChar).Value = City;
                cmd.Parameters.Add("@State", SqlDbType.VarChar).Value = State;
                cmd.Parameters.Add("@PreferredLanguage", SqlDbType.VarChar).Value = PreferredLanguage;
                cmd.Parameters.Add("@IsAssociatedWithBerger", SqlDbType.VarChar).Value = IsAssociated;
                cmd.Parameters.Add("@Source", SqlDbType.VarChar).Value = Source;
                cmd.Parameters.Add("@Medium", SqlDbType.VarChar).Value = Medium;
                cmd.Parameters.Add("@Campaign", SqlDbType.VarChar, 2000).Value = Campaign;
                cmd.Parameters.Add("@Term", SqlDbType.VarChar).Value = "";
                cmd.Parameters.Add("@Keyword", SqlDbType.VarChar).Value = ""; 
                cmd.Parameters.Add("@UrlReferrer", SqlDbType.VarChar).Value = PreviousUrl; 
                cmd.Parameters.Add("@ErrorMessage", SqlDbType.VarChar, 2000).Direction = ParameterDirection.Output;

                //add any parameters the stored procedure might require
                cnn.Open();
                object o = cmd.ExecuteScalar();
                cnn.Close();
                var result = (int)cmd.Parameters["@ReturnVal"].Value;
                if (result == 1)
                    return Json(new { succeeded = true, message = "Success" });
                else
                    return Json(new { succeeded = false, message = (string)cmd.Parameters["@ErrorMessage"].Value });
            }
            catch (Exception ex)
            {
                return Json(new { succeeded = false, message = ex.Message });
            }
        }
        [HttpPost]
        public JsonResult InserPaintertData(String Name, String Telephone, String Pincode, String City, string State, string PreferredLanguage, string IsAssociated, String Campaign, String Source, String Medium, string PreviousUrl)
        {
            try
            {
                string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["bergerConnectionString"].ConnectionString;

                SqlConnection cnn = new SqlConnection(cnnString);
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cnn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "PainterLandingInsert";
                cmd.Parameters.Add("@ReturnVal", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
                cmd.Parameters.Add("@Telephone", SqlDbType.VarChar).Value = Telephone;
                cmd.Parameters.Add("@Pincode", SqlDbType.VarChar).Value = Pincode;
                cmd.Parameters.Add("@City", SqlDbType.VarChar).Value = City;
                cmd.Parameters.Add("@State", SqlDbType.VarChar).Value = State;
                cmd.Parameters.Add("@PreferredLanguage", SqlDbType.VarChar).Value = PreferredLanguage;
                cmd.Parameters.Add("@IsAssociatedWithBerger", SqlDbType.VarChar).Value = IsAssociated;
                cmd.Parameters.Add("@Source", SqlDbType.VarChar).Value = Source;
                cmd.Parameters.Add("@Medium", SqlDbType.VarChar).Value = Medium;
                cmd.Parameters.Add("@Campaign", SqlDbType.VarChar, 2000).Value = Campaign;
                cmd.Parameters.Add("@Term", SqlDbType.VarChar).Value = "";
                cmd.Parameters.Add("@Keyword", SqlDbType.VarChar).Value = "";
                cmd.Parameters.Add("@UrlReferrer", SqlDbType.VarChar).Value = PreviousUrl;
                cmd.Parameters.Add("@ErrorMessage", SqlDbType.VarChar, 2000).Direction = ParameterDirection.Output;

                //add any parameters the stored procedure might require
                cnn.Open();
                object o = cmd.ExecuteScalar();
                cnn.Close();
                var result = (int)cmd.Parameters["@ReturnVal"].Value;
                if (result == 1) { 
                    InsertPainterLandingData();
                    return Json(new { succeeded = true, message = "Success" });
                }
                else
                    return Json(new { succeeded = false, message = (string)cmd.Parameters["@ErrorMessage"].Value });
            }
            catch (Exception ex)
            {
                return Json(new { succeeded = false, message = ex.Message });
            }
        }
        public class PainterLandingOutputModel
        {
            public long ReferenceId { get; set; }
            public string UserId { get; set; }
            public string MobileNo { get; set; }
            public string Name { get; set; }
            public string PinCode { get; set; }
            public int PainterLandingId { get; set; }
            public string City { get; set; }

            public string State { get; set; }
            public string Preferredlanguage { get; set; }
            public string AssociatedWithBerger { get; set; }
            public bool Flag { get; set; }
            public string Message { get; set; }
            public string DetailMessage { get; set; }


        }
        
        public string InsertPainterLandingData()
        {
            string UserId = "1";
            var Response = new List<PainterLandingOutputModel>();
           // System.Net.Http.Headers.HttpRequestHeaders headers = this.Request.Headers;
            
            string response = "";
          

            SqlCommand command = new SqlCommand();
                string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["bergerConnectionString"].ConnectionString;

                SqlConnection connection = new SqlConnection(cnnString);

                command = new SqlCommand("PainterList", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                List<data> ldata = new List<data>();
                
                while (reader.Read())
                {
                    
                    data data = new data();
                    data.PainterLandingId = int.Parse(reader["PainterLandingId"].ToString()); 
                    data.City = reader["City"].ToString(); 
                    data.State = reader["State"].ToString(); 
                    data.AssociatedWithBerger = reader["IsAssociatedWithBerger"].ToString(); 
                    data.Preferredlanguage = reader["Preferredlanguage"].ToString(); 
                    data.MobileNo = reader["Telephone"].ToString(); 
                    data.Name = reader["Name"].ToString(); 
                    data.PinCode = reader["PinCode"].ToString(); 

                    ldata.Add(data);
                }


               
                if (ldata.Count == 0)
                {

                    response = "No data to update";
                }
                else
                {
                    LogException.Log(ldata.Count.ToString());
                    response = PostB2B_Bulk("B2BLEADS/WebServicePainter.asmx/InsertBulkPainters", UserId, ldata);
                    if (response == "Success")
                    {
                        foreach (var c in ldata)
                        {
                            var Request = new PainterLandingInputModel();
                            Request.PainterLandingId = c.PainterLandingId;


 
                            SqlConnection cnn = new SqlConnection(cnnString);
                            SqlCommand cmd = new SqlCommand();
                            cmd.Connection = cnn;
                            cmd.CommandText = "UpdatePainterStatusSentStatus";

                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            cmd.Parameters.Add("@PainterLandingID", SqlDbType.Int).Value = c.PainterLandingId;
                            
                            //add any parameters the stored procedure might require
                            cnn.Open();
                            object o = cmd.ExecuteScalar();
                            cnn.Close();

                            response = "Success";
                        }
                    }

                }
 

            return response;
        }

        public class PainterLandingInputModel
        {
            public int PainterLandingId { get; set; }
            public string UserId { get; set; }

            public string MobileNo { get; set; }
            public string Name { get; set; }
            public string PinCode { get; set; }
            public string City { get; set; }

            public string State { get; set; }
            public string Preferredlanguage { get; set; }
            public string AssociatedWithBerger { get; set; }

        }
        public class BusinessLeadResponse
        {

            public bool Flag { get; set; }
            public string Message { get; set; }

            public string DetailMessage { get; set; }

            public int ResponseCode { get; set; }


            public string ResponseMsg { get; set; }
        }


        public class data
        {
            public string MobileNo { get; set; }
            public string Name { get; set; }
            public string PinCode { get; set; }
            public int PainterLandingId { get; set; }
            public string City { get; set; }

            public string State { get; set; }
            public string Preferredlanguage { get; set; }
            public string AssociatedWithBerger { get; set; }
        }
        public string PostB2B_Bulk(string url, string UserId, List<data> model)
        {
            BusinessLeadResponse response = new BusinessLeadResponse();
            string apiResponse = string.Empty;
            try
            {

                string AuthKey = ConfigurationManager.AppSettings["API.CRMBerger.B2BApi.Authorization"];

                string urlToCreate = string.Format("{0}{1}", ConfigurationManager.AppSettings["API.CRMBerger.B2BApi.BaseUrl"], url);

                var dict = new Dictionary<string, string>();
                LogException.Log(urlToCreate);


                dict.Add("Data", JsonConvert.SerializeObject(model));
                dict.Add("UserId", UserId);


                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("AuthKey", AuthKey);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));
                    ServicePointManager.SecurityProtocol = (SecurityProtocolType)48 | (SecurityProtocolType)192 | (SecurityProtocolType)768 | (SecurityProtocolType)3072;
                    HttpResponseMessage res = client.PostAsync(urlToCreate, new FormUrlEncodedContent(dict)).Result;

                    var result = res.Content.ReadAsStringAsync().Result;
                    string Finalresult = result.ToString();
                    apiResponse = Finalresult;
                    var data = JsonConvert.DeserializeObject<BusinessLeadResponse>(Finalresult);

                    if (data == null || data.ResponseCode == null || data.ResponseCode != 200)
                    {
                        if (!string.IsNullOrWhiteSpace(data.ResponseMsg))
                        {
                            response.ResponseCode = data.ResponseCode;
                            response.ResponseMsg = data.ResponseMsg;
                        }

                        return apiResponse;
                    }
                    else
                    {
                        if (!string.IsNullOrWhiteSpace(data.ResponseMsg))
                        {
                            response.ResponseCode = data.ResponseCode;
                            response.ResponseMsg = data.ResponseMsg;
                        }

                    }
                }

                var apiRequest = model;
                string apiMessage = string.Format("Painter Api Request : {0}{1} Response : {2}", apiRequest, Environment.NewLine, apiResponse);
                LogException.Log(apiMessage);
                return "Success";
            }
            catch (Exception ex)
            {
                response.ResponseMsg = ex.Message;
                LogException.Log(ex.Message);
                return "Failure";
            }
        }

        public class LogException
        {

            public static void Log(string message)
            {
                string rootLocation = ConfigurationManager.AppSettings["ExceptionLog.RootLocation"];

                if (string.IsNullOrWhiteSpace(rootLocation))
                {
                    return;
                }

                string fileName = DateTime.Now.ToString("ddMMyyyy");
                string filePath = string.Format("{0}/{1}.txt", rootLocation, fileName);

                string CurrentDomainBaseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                string physicalPath = string.Format("{0}{1}", CurrentDomainBaseDirectory, filePath);

                string physicalRootLocation = string.Format("{0}{1}", CurrentDomainBaseDirectory, rootLocation);
                if (!Directory.Exists(physicalRootLocation))
                {
                    Directory.CreateDirectory(physicalRootLocation);
                }

                System.IO.File.AppendAllText(physicalPath, DecorateMessage(message));
            }


            private static string DecorateMessage(string message)
            {
                StringBuilder msg = new StringBuilder();
                string divider = new String('-', 20);

                msg.AppendFormat("Logged Date: {0}", DateTime.Now);
                msg.Append(Environment.NewLine);
                msg.Append(divider);
                msg.Append(Environment.NewLine);
                msg.Append(message);
                msg.Append(Environment.NewLine);
                msg.Append(divider);
                msg.Append(Environment.NewLine);
                msg.Append(divider);
                msg.Append(Environment.NewLine);
                msg.Append(Environment.NewLine);

                return msg.ToString();
            }
        }

    }
}