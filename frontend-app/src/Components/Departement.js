import React, { Component } from "react";
import { Endpoints } from "../Constantes/APIEndpoints";

export class Departement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departements: [],
            modalTitle: "",
            DepartementId: 0,
            DepartementName: "",
        }
    }
    refreshList() {
        const url = Endpoints.API_URL + 'departement';
        fetch(url, {
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
        this.setState({ DepartementName: e.target.value });
    }

    addClicked() {
        this.setState({
            modalTitle: "Add Departement",
            DepartementId: 0,
            DepartementName: "",
        });
    }
    editClicked(departement) {
        this.setState({
            modalTitle: "Edit Departement",
            DepartementId: departement.DepartementId,
            DepartementName: departement.DepartementName
        });
    }

    createClicked() {
        const url = Endpoints.API_URL + 'departement';
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "DepartementName": this.state.DepartementName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result)
                this.refreshList()
                this.setState({
                    DepartementName: "",
                })
            }, (error) => { alert("Failed") })
    }

    updateClicked() {
        const url = Endpoints.API_URL + 'departement/' + this.state.DepartementId;
        fetch(url, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "DepartementName": this.state.DepartementName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result)
                this.refreshList()
            }, (error) => { alert("Failed") })
    }

    deleteClicked(DepartementId) {
        const url = Endpoints.API_URL + 'departement/' + DepartementId;
        if (window.confirm(`Are you sure you want to delete this departement  ?`)) {
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

    render() {

        const {
            departements,
            modalTitle,
            DepartementId,
            DepartementName,
        } = this.state;
        return (
            <div>
                <div className='table-responsive mt-5'>
                    <button type="button" className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#depModal"
                        onClick={() =>
                            this.addClicked()}>
                        Add Departement
                    </button>
                    <table className='table table-bordered border-dark'>
                        <thead>
                            <tr>
                                <th scope='col'>Departement ID</th>
                                <th scope='col'>Departement Name</th>
                                <th scope='col'>CRUD Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                departements.map((departement) => (
                                    <tr key={departement.DepartementId}>
                                        <th scope='col'>{departement.DepartementId}</th>
                                        <td >{departement.DepartementName}</td>
                                        <td >
                                            <button className='btn btn-success btn-lg mx-3 my-3'
                                                data-bs-toggle="modal"
                                                data-bs-target="#depModal"
                                                onClick={() => this.editClicked(departement)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => { this.deleteClicked(departement.DepartementId) }} className='btn btn-danger btn-lg'>
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
                        /**
                         * < div className="modal fade" id="depModal" tabIndex="-1" aria-hidden="true"> */
                    }
                    <div className="modal fade" id="depModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="modal-title">{modalTitle}</div>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    <div className="input-group mt-3">
                                        <span className="input-group-text">Departement Name</span>
                                        <input type="text" className="form-control"
                                            value={DepartementName} onChange={this.ChangeDepartementName} />
                                    </div>
                                    {DepartementId === 0 ?
                                        <button onClick={() => this.createClicked()} type="button" className="btn btn-primary float-start mt-5">Create</button>
                                        :
                                        <button onClick={() => this.updateClicked()} type="button" className="btn btn-primary float-start mt-5">Update</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}