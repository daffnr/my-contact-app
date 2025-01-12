import React from "react";

const List = ({ data, handleEdit, handleDelete }) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>No. Telp</th>
            <th>Email</th> {/* Tambahkan kolom email */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.telp}</td>
              <td>{contact.email}</td> {/* Tampilkan email disini */}
              <td className="btn-parent">
                <button
                    onClick={() => handleEdit(contact.id)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="btn btn-danger btn-sm ml-5"
                  >
                    Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
