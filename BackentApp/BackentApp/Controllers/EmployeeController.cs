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
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _env = webHostEnvironment;
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            
            string query = @"
                select * from dbo.employee ";
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
                select * from dbo.Employee where EmployeeId=@Id";
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
        public JsonResult AddEmployee(Employee employee)
        {

            string query = @"
                insert into dbo.employee values (@employeeName, @departement, @dateOfJoining, @photoFileName)";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@employeeName", employee.EmployeeName);
                    command.Parameters.AddWithValue("@departement", employee.Departement);
                    command.Parameters.AddWithValue("@dateOfJoining", employee.DateOfJoining);
                    command.Parameters.AddWithValue("@photoFileName", employee.PhotoFileName);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Added successfully");
        }


        [HttpPut("{Id}")]
        public JsonResult UpdateEmployee(int Id, Employee employee)
        {

            string query = @"
                update dbo.employee 
                set EmployeeName = @employeeName, Departement=@departement, DateOfJoining=@dateOfJoining, PhotoFileName=@photoFileName
                where EmployeeId = @employeeID";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@employeeId", Id);
                    command.Parameters.AddWithValue("@employeeName", employee.EmployeeName);
                    command.Parameters.AddWithValue("@departement", employee.Departement);
                    command.Parameters.AddWithValue("@dateOfJoining", employee.DateOfJoining);
                    command.Parameters.AddWithValue("@photoFileName", employee.PhotoFileName);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Updated successfully");
        }

        [HttpDelete("{Id}")]
        public JsonResult DeleteEmployee(int Id)
        {

            string query = @"
                delete from dbo.employee 
                where EmployeeId = @employeeID";
            string sqlDataSourece = _configuration.GetConnectionString("DatabaseConnection");
            SqlDataReader myReader;

            using (SqlConnection connection = new SqlConnection(sqlDataSourece))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@employeeId", Id);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult("Deleted successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + $"/Photos/{filename}";

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);


            }
            catch (Exception)
            {
                return new JsonResult("anonymous.jpg");
            }
        }
    }
}
