import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Table, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EmpDirectory() {

    const [id, setId] = useState("");
    const [empname, setEmpName] = useState("");
    const [empdepartment, setEmpDepartment] = useState("");
    const [isactive, setIsActive] = useState([]);
    const [employees, setUsers] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {

        const result = await axios.get("https://localhost:44349/api/Employee/GetEmployee");
        setUsers(result.data);
        console.log(result.data);
    }

    async function save(event) {

        event.preventDefault();
        try {
            await axios.post("https://localhost:44349/api/Employee/AddEmployee", {

                empname: empname,
                empdepartment: empdepartment,

            });
            alert("Employee has been succesffuly added!");
            setId("");
            setEmpName("");
            setEmpDepartment("");


            Load();
        } catch (err) {
            alert(err);
        }
    }

    async function editEmployee(employees) {
        setEmpName(employees.empname);
        setEmpDepartment(employees.empdepartment);


        setId(employees.id);
    }


    async function DeleteEmployee(id) {
        await axios.delete("https://localhost:44349/api/Employee/DeleteEmployee/" + id);
        alert("Employee deleted Successfully");
        setId("");
        setEmpName("");
        setEmpDepartment("");
        Load();
    }


    async function update(event) {
        event.preventDefault();
        try {

            await axios.patch("https://localhost:44349/api/Employee/UpdateEmployee/" + employees.find((u) => u.id === id).id || id,
                {
                    id: id,
                    empname: empname,
                    empdepartment: empdepartment,

                }
            );
            alert("Employee record is Updated");
            setId("");
            setEmpName("");
            setEmpDepartment("");

            Load();
        } catch (err) {
            alert(err);
        }
    }

    return (

        <Fragment>
            <ToastContainer />
            <Container style={{ marginTop: '20px' }}>
                <Row >
                    <Col>
                        <input
                            type="text"
                            class="form-control"
                            id="id"
                            hidden
                            value={id}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            class="form-control"
                            id="empname"
                            value={empname}
                            onChange={(event) => {
                                setEmpName(event.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <input
                            type="text"
                            class="form-control"
                            id="empdepartment"
                            value={empdepartment}
                            onChange={(event) => {
                                setEmpDepartment(event.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <button class="btn btn-primary mt-4" style={{marginRight: "10px"}} onClick={save}>
                            Register
                        </button>
                        <button class="btn btn-warning mt-4" onClick={update}>
                            Update
                        </button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Activity status</th>
                        {/* <th>Activity Status</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(function fn(employee) {
                        return (
                            <tr>
                                <th scope="row">{employee.empname} </th>
                                <td>{employee.empdepartment}</td>
                                <td>{employee.isactive}</td>
                                {/* <td>{item.IsActive}</td> */}
                                <td colSpan={2}>
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        style={{ marginRight: "10px" }}
                                        onClick={() => editEmployee(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        onClick={() => DeleteEmployee(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                        )
                    })
                    }
                </tbody>
            </Table>
        </Fragment>
    );
}

export default EmpDirectory;