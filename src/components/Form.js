import React from "react";

function Form({ formData, handleChange, handleFileChange, handleSubmit, preview, isUpdate }) {
  return (
    <div className="bg-white pb-3 mx-auto mb-5" style={{ width: "100%", maxWidth: 600 }}>
      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            className="form-control"
            value={formData.name}
            name="name"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group mt-3">
          <label>Phone Number</label>
          <input
            type="text"
            onChange={handleChange}
            value={formData.telp}
            className="form-control"
            name="telp"
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange}
            value={formData.email}
            className="form-control"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-3">
          <label>Upload Picture</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="preview" className="table-image" />
          </div>
        )}
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            {isUpdate.status ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
