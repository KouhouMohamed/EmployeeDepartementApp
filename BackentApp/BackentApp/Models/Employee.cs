namespace BackentApp.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;

        //public string Departement { get; set; } = string.Empty;

        public int DepartementID { get; set; }
        public virtual Departement Departement{ get; set; }
        public string DateOfJoining { get; set; } = string.Empty;
        public string PhotoFileName { get; set; } = string.Empty;
    }
}
