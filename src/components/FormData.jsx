import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FormData() {
  var [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    umessage: "",
    index: "",
  });
  var [userData, setUserData] = useState([]);
  var getValue = (event) => {
    var oldData = { ...formData };
    var inputName = event.target.name;
    var inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };
  var handleSubmit = (event) => {
    var currentUserFormData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    };
    if (formData.index === "") {
      var checkFilterUser = userData.filter(
        (v) => v.uemail == formData.uemail || v.uphone == formData.uphone
      );
      if (checkFilterUser.length == 1) {
        toast.error("Email or Phone Already Exists !");
      } else {
        var oldUserData = [...userData, currentUserFormData];
        setUserData(oldUserData);
        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      }
    } else {
      var editIndex = formData.index;
      var oldData = userData;
      var checkFilterUser = userData.filter(
        (v, i) =>
          (v.uemail == formData.uemail || v.uphone == formData.uphone) &&
          i != editIndex
      );
      if (checkFilterUser.length == 0) {
        oldData[editIndex]["uname"] = formData.uname;
        oldData[editIndex]["uemail"] = formData.uemail;
        oldData[editIndex]["uphone"] = formData.uphone;
        oldData[editIndex]["umessage"] = formData.umessage;
        setUserData(oldData);
        setFormData({
          uname: "",
          uemail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      } else {
        toast.error("Email or Phone Already Exists !");
      }
    }
    event.preventDefault();
  };

  var deleteRow = (indexNumber) => {
    var filterDataafterDelete = userData.filter((v, i) => i != indexNumber);
    toast.success("Data Deleted Successfully !");
    setUserData(filterDataafterDelete);
  };
  var editRow = (indexNumber) => {
    var editData = userData.filter((v, i) => i == indexNumber)[0];
    editData["index"] = indexNumber;
    setFormData(editData);
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-center my-4">Form Validation</h2>
      <div className="container-fluid">
        <div className="row justify-content-center ">
          <div className="col-sm-8 card p-3 formData">
            <form onSubmit={handleSubmit} autoComplete="on">
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    value={formData.uname}
                    className="form-control"
                    name="uname"
                    maxLength={35}
                    onChange={getValue}
                    placeholder="Enter Your Full Name"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="exampleFormControlInput1"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="uemail"
                    className="form-control"
                    value={formData.uemail}
                    onChange={getValue}
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="uphone"
                    className="form-control"
                    value={formData.uphone}
                    onChange={getValue}
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    maxLength={10}
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Message</label>
                <div className="col-sm-10">
                  <textarea
                    name="umessage"
                    className="form-control"
                    rows="3"
                    value={formData.umessage}
                    onChange={getValue}
                    placeholder="Enter Message"
                    required
                  />
                </div>
              </div>

              <div className="d-grid ">
                <button className="btn btn-info">
                  {formData.index !== "" ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
          {/* Show Data */}
          <div className="col-sm-8 mt-4 card p-3 table-responsive formTable">
            <table class="table table-striped  table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">PHONE</th>
                  <th scope="col">MESSAGE</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td className="d-flex">
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => deleteRow(index)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => editRow(index)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormData;
