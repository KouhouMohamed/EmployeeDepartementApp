using BackentApp.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace BackentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartementController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly MyDatabaseContext _context = new MyDatabaseContext();

        public DepartementController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            
            string query = @"
                select * from dbo.Departement ";
            DataTable table = new DataTable();
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    myReader = command.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{Id}")]
        public JsonResult GetOne(int Id)
        {

            string query = @"
                select * from dbo.Departement where DepartementId=@Id";
            DataTable table = new DataTable();
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", Id);
                    myReader = command.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult AddDepartement(Departement departement)
        {

            string query = @"
                insert into dbo.Departement values (@DepartementName)";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DepartementName", departement.DepartementName);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Added successfully");
        }


        [HttpPut("{Id}")]
        public JsonResult UpdateDepartement(int Id, Departement departement)
        {

            string query = @"
                update dbo.Departement 
                set DepartementName = @DepartementName
                where DepartementId = @DepartementID";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DepartementId", Id);
                    command.Parameters.AddWithValue("@DepartementName", departement.DepartementName);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Updated successfully");
        }

        [HttpDelete("{Id}")]
        public JsonResult DeleteDepartement(int Id)
        {

            string query = @"
                delete from dbo.Departement 
                where DepartementId = @DepartementID";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@DepartementId", Id);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }
    }
}
