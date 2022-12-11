import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AddStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/students").then((res) => {
      if (res.data.status === 200) {
          setStudent(res.data.students)
      }
    });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
     const btn = e.currentTarget
      axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`).then(res => {
       if(res.data.status === 200){
         console.log(res.data.message)
         btn.closest('tr').remove()
       }
      })

  }
 

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex align-items-baseline justify-content-between">
              <h2>All Students</h2>
              <Link to={"/"} className="btn btn-primary px-3 py-2 float-end">
                Students Form
              </Link>
            </div>
            <div className="card-body">
              <div className="card mb-grid">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="card-header-title">Students table</div>
                </div>
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Course</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {student.map((stud) => (
                        <tr key={stud.id}>
                          <td>{stud.name}</td>
                          <td>{stud.course}</td>
                          <td>{stud.email}</td>
                          <td>{stud.phone}</td>
                          <td>{stud.gender}</td>
                          <td className="d-block mx-3">
                            <Link to={`/edit-student/${stud.id}`} className="btn btn-dark px-4 mx-3">
                              Edit
                            </Link>
                            <button className="btn btn-danger px-4 mx-3" onClick={(e) => handleDelete(e,stud.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="card-footer d-flex justify-content-end">
                  <ul className="pagination pagination-clean pagination-sm mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">
                        ‹
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ›
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
