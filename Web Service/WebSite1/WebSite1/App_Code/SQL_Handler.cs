using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for Class1
/// </summary>
public class SQL_Handler
{
    static string ConnectionStr = @"Data Source=DESKTOP-PR7E7CC\SQLEXPRESS;Initial Catalog=T_Game2;Integrated Security=True";

    DataSet ds = new DataSet();
    SqlDataAdapter adtr = null;

    private static SQL_Handler instance;

    public static SQL_Handler Instance {
        get
        {
            if (instance == null)
                instance = new SQL_Handler();

            return instance;
        }
    }
    private SQL_Handler() { }


    public User Login(string email, string pass)
    {
        SqlConnection con = new SqlConnection(ConnectionStr);
        adtr = new SqlDataAdapter($" SELECT dbo.Users.User_Id, dbo.Users.User_Name, dbo.High_Score.High_Score " +
                $" FROM dbo.High_Score INNER JOIN dbo.Users ON dbo.High_Score.User_Id = dbo.Users.User_Id " +
                $" WHERE(dbo.Users.User_Password = @pass) AND(dbo.Users.Email = @email)", con);
        adtr.SelectCommand.Parameters.Add(new SqlParameter("pass" , pass));
        adtr.SelectCommand.Parameters.Add(new SqlParameter("email", email));
        ds.Clear();
        adtr.Fill(ds, "Users");

        DataTable TB_Users = ds.Tables["Users"];

        if (TB_Users.Rows.Count > 0)
        {
           
            User usr = new User(TB_Users.Rows[0]["User_Name"].ToString(), int.Parse(TB_Users.Rows[0]["User_Id"].ToString()), int.Parse(TB_Users.Rows[0]["High_Score"].ToString()));

            return usr;
        }
        return null;
    }

    public int updateScore(string email, int newScore)
    {
        SqlConnection con = new SqlConnection(ConnectionStr);
        SqlCommand cmd = new SqlCommand("P_Update_HighScore", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("Email", email);
        cmd.Parameters.AddWithValue("NewScore", newScore);
        con.Open();
        int k = cmd.ExecuteNonQuery();
        con.Close();
        return k;


    }

    public int Register(string email, string pass, string user)
    {
        SqlConnection con = new SqlConnection(ConnectionStr);
        SqlCommand cmd = new SqlCommand("P_Check_Availability", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("Name", user);
        cmd.Parameters.AddWithValue("Pass", pass);
        cmd.Parameters.AddWithValue("Email", email);
        con.Open();
        int k = cmd.ExecuteNonQuery();
        con.Close();
        return k;
    }

    
    public string GetHighScore()
    {
        SqlConnection con = new SqlConnection(ConnectionStr);
        ds.Clear();
        adtr = new SqlDataAdapter($"SELECT TOP 10 * FROM High_Score ORDER BY High_Score DESC", con);
        adtr.Fill(ds, "High_Score");
        var Scores = new List<Dictionary<string, object>>();
        for(int i = 0; i < ds.Tables["High_Score"].Rows.Count; i++)
        {
            var User = new Dictionary<string, object>();
            foreach (DataColumn col in ds.Tables["High_Score"].Rows[i].Table.Columns)
            {
                User.Add(col.ColumnName, ds.Tables["High_Score"].Rows[i][col]);
            }
            Scores.Add(User);
        }
        return new JavaScriptSerializer().Serialize(Scores); ;
    }
}