import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;


const Student = () => {
  const [input, setInput] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
    gender: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: input.name,
      course: input.course,
      email: input.email,
      phone: input.phone,
      gender: input.gender,
    };
     axios.post("http://127.0.0.1:8000/api/add-student", data)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.message);
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex align-items-baseline justify-content-between">
                <h2>Student Management</h2>
                <Link
                  to={"/add-student"}
                  className="btn btn-primary px-3 py-2 float-end"
                >
                  All Students
                </Link>
              </div>
              <div className="card-body">
                <form
                  style={{ width: "480px", margin: "auto" }}
                  onSubmit={handleSubmit}
                >
                  <div className="form-group mb-3">
                    <label className="fs-5">Student name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      className="form-control"
                      value={input.name}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student course</label>
                    <input
                      type="text"
                      name="course"
                      onChange={handleInput}
                      className="form-control"
                      value={input.course}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      className="form-control"
                      value={input.email}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fs-5">Student phone</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleInput}
                      className="form-control"
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
                      <option value={''} disabled>
                        --Select Gender--
                      </option>
                      <option value={'male'}>Male</option>
                      <option value={'female'}>Female</option>
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
    </>
  );
};

export default Student;
