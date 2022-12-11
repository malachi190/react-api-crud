import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [input, setInput] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const studentId = id;
    axios
      .get(`http://127.0.0.1:8000/api/edit-student/${studentId}`)
      .then((res) => {
        if (res.data.status === 200) {
          setInput(res.data.student);
        } else if (res.data.status === 404) {
          console.log(`Error! ${res.data.message}`);
          navigate("/add-student");
        }
      });
    setPageLoad(false);
  }, [id, navigate]);

  const handleInput = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) =>{
    e.preventDefault();
    const studentId = id
    const data = input;
    axios.put(`http://127.0.0.1:8000/api/update-student/${studentId}`, data).then((res) => {
        if(res.data.status === 200){
          console.log("Success!", res.data.message)
          navigate('/add-student')
        } 
    }).catch((error) => {
      console.log(error)
    })
  }

  if (pageLoad) {
    return <h5>loading...</h5>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex align-items-baseline justify-content-between">
                <h2>Edit Student</h2>
                <Link
                  to={"/add-student"}
                  className="btn btn-primary px-3 py-2 float-end"
                >
                  All Students
                </Link>
              </div>
              <div className="card-body">
                <form style={{ width: "480px", margin: "auto" }} 
                 onSubmit={updateStudent}>
                  <div className="form-group mb-3">
                    <label className="fs-5">Student name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={handleInput}
                      value={input.name}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student course</label>
                    <input
                      type="text"
                      name="course"
                      className="form-control"
                      onChange={handleInput}
                      value={input.course}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleInput}
                      value={input.email}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      onChange={handleInput}
                      value={input.phone}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      onChange={handleInput}
                      value={input.gender}
                    >
                      <option value={""} disabled>
                        --Select Gender--
                      </option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      className="btn btn-success px-3 shadow text-uppercase"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditStudent;
