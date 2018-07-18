using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{
    SQL_Handler SQL;
    public WebService()
    {
        SQL = SQL_Handler.Instance;

    }

    [WebMethod]
    public string Login(string email, string pass)
    {
        User usr = SQL.Login(email, pass);
        string output = new JavaScriptSerializer().Serialize(usr);
        return output;
    }

    [WebMethod]
    public string Register(string email,string pass ,string user)
    {
        int rgs = SQL.Register(email, pass, user);
        string output = new JavaScriptSerializer().Serialize(rgs);
        return output;

    }

    [WebMethod]
    public int UpdateScore(string email , int newScore)
    {
        int sc = SQL.updateScore(email, newScore);
        return sc;
    }

        [WebMethod]
    public string GetHighScore()
    {
        return SQL.GetHighScore();
    }

}
