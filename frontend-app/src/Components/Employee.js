import React, { Component } from "react";
import { Endpoints } from "../Constantes/APIEndpoints";
import { Variables } from "../Constantes/Variables";
import $ from 'jquery';
export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departements: [],
            employees: [],
            modalTitle: "",
            EmployeeId: 0,
            EmployeeName: "",
            Departement: "",
            DateOfJoining: new Date().toISOString().substr(0, 10),
            PhotoFileName: Variables.DEFAULT_PHOTO_NAME,
            PhotoPath: Endpoints.PHOTO_URL,
            show: true
        }
    }
    refreshList() {
        const emp_url = Endpoints.API_URL + 'employee';
        const dep_url = Endpoints.API_URL + 'departement';
        fetch(emp_url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(employeesFromServer => {
                this.setState({ employees: employeesFromServer })
            })
            .catch((error) => {
                alert(error);
            });


        fetch(dep_url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(departementsFromServer => {
                this.setState({ departements: departementsFromServer })
            })
            .catch((error) => {
                alert(error);
            });
    }

    // Function to call when the component called
    componentDidMount() {
        this.refreshList()
    }

    ChangeDepartementName = (e) => {
        this.setState({ Departement: e.target.value });
    }
    ChangeEmployeeName = (e) => {
        this.setState({ EmployeeName: e.target.value });
    }
    ChangeDateOfJoining = (e) => {
        this.setState({ DateOfJoining: e.target.value });
    }

    addClicked() {
        this.setState({
            modalTitle: "Add Employee",
            EmployeeId: 0,
            Departement: this.state.departements[0].DepartementName,
            EmployeeName: "",
            PhotoFileName: Variables.DEFAULT_PHOTO_NAME,

        });
    }
    editClicked(employee) {
        console.log(employee.DateOfJoining)
        this.setState({
            modalTitle: "Edit Employee",
            EmployeeId: employee.EmployeeId,
            Departement: employee.Departement,
            DateOfJoining: employee.DateOfJoining.substr(0, 10),
            EmployeeName: employee.EmployeeName,
            PhotoFileName: employee.PhotoFileName,
        });
    }

    createClicked() {
        const url = Endpoints.API_URL + 'employee';
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "EmployeeName": this.state.EmployeeName,
                "Departement": this.state.Departement,
                "DateOfJoining": this.state.DateOfJoining,
                "PhotoFileName": this.state.PhotoFileName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result)
                this.refreshList()
                this.setState({
                    modalTitle: "Add Employee",
                    EmployeeId: 0,
                    Departement: "",
                    DateOfJoining: Date.stringify,
                    EmployeeName: "",
                    PhotoFileName: Variables.DEFAULT_PHOTO_NAME,

                })
            }, (error) => { alert("Failed") })
    }

    updateClicked() {
        const url = Endpoints.API_URL + 'employee/' + this.state.EmployeeId;

        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "EmployeeId": this.state.EmployeeId,
                "EmployeeName": this.state.EmployeeName,
                "Departement": this.state.Departement,
                "DateOfJoining": this.state.DateOfJoining,
                "PhotoFileName": this.state.PhotoFileName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({ show: false })
                $("#depModal").modal('hide')
                alert(result)
                this.refreshList()

            }, (error) => { alert("Failed") })
    }

    deleteClicked(EmployeeId) {
        const url = Endpoints.API_URL + 'employee/' + EmployeeId;
        if (window.confirm(`Are you sure you want to delete this employee  ?`)) {
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result)
                    this.refreshList()
                }, (error) => { alert("Failed") })

        }
    }
    imageUploaded = (e) => {
        const url = Endpoints.API_URL + 'employee/saveFile'
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }
    render() {

        const {
            departements,
            employees,
            modalTitle,
            EmployeeId,
            EmployeeName,
            Departement,
            DateOfJoining,
            PhotoFileName,
            PhotoPath,
            show
        } = this.state;
        return (
            <>
                <div className='table-responsive mt-5'>
                    <button type="button" className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#depModal"
                        onClick={() => this.addClicked()}>
                        Add Employee
                    </button>
                    <table className='table table-bordered border-dark'>
                        <thead>
                            <tr>
                                <th scope='col'>Employee ID</th>
                                <th scope='col'>Profil image</th>
                                <th scope='col'>Employee Name</th>
                                <th scope='col'>Date of joining</th>
                                <th scope='col'>Departement</th>
                                <th scope='col'>CRUD Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((employee) => (
                                    <tr key={employee.EmployeeId}>
                                        <th scope='col'>{employee.EmployeeId}</th>
                                        <td >
                                            <img width="50px" height="50px"
                                                src={PhotoPath + employee.PhotoFileName} />
                                        </td>
                                        <td >{employee.EmployeeName}</td>
                                        <td >{employee.DateOfJoining}</td>
                                        <td >{employee.Departement}</td>
                                        <td >
                                            <button className='btn btn-success btn-lg mx-3 my-3'
                                                data-bs-toggle="modal"
                                                data-bs-target="#depModal"
                                                onClick={() => this.editClicked(employee)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => { this.deleteClicked(employee.EmployeeId) }} className='btn btn-danger btn-lg'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    {
                        <div className="modal fade" id="depModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="modal-title">{modalTitle}</div>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="d-flex flex-row bd-highlight mt-3">
                                            <div className="p-2 w-50 bd-highlight mt-3">
                                                <div className="input-group mt-3">
                                                    <span className="input-group-text">Employee Name</span>
                                                    <input type="text" className="form-control"
                                                        value={EmployeeName} onChange={this.ChangeEmployeeName} />
                                                </div>
                                                <div className="input-group mt-3">
                                                    <span className="input-group-text">Departement Name</span>
                                                    <select className="form-select" onChange={this.ChangeDepartementName} value={Departement}>
                                                        {
                                                            departements.map(dep => <option key={dep.DepartementId}>
                                                                {dep.DepartementName}
                                                            </option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div className="input-group mt-3">
                                                    <span className="input-group-text">Date of joining</span>
                                                    <input type="date" className="form-control"
                                                        value={DateOfJoining} onChange={this.ChangeDateOfJoining} />
                                                </div>

                                            </div>
                                            <div className="p-2 w-50 bd-highlight mt-3">
                                                <img width="250px" height="250px"
                                                    src={PhotoPath + PhotoFileName} />
                                                <input className="m-2" type="file" onChange={this.imageUploaded} />
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            {EmployeeId === 0 ?
                                                <button onClick={() => this.createClicked()} type="button" data-dismiss="modal" className="btn btn-primary float-start mt-5">Create</button>
                                                :
                                                <button onClick={() => this.updateClicked()} type="button" data-dismiss="modal" className="btn btn-primary float-start mt-5">Update</button>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }
}