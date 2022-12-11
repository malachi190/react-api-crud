import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./components/Student";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
