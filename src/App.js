import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";


let api = axios.create({ baseURL: "http://localhost:3001" });

function App() {
  const [contacts, setContacts] = useState([]);
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
    email: ""
  });

  useEffect(() => {
   
    api.get("/contacts").then((res) => {
      setContacts(res.data);
    });
  }, []);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form data:', formData); 
    let data = [...contacts];
  
    if (formData.name === "" || formData.telp === "") {
      return false;
    }
  
    if (isUpdate.status) {
      
      const updatedData = {
        name: formData.name,
        telp: formData.telp,
        email: formData.email,
      };
  
      
      api
        .put(`/contacts/${isUpdate.id}`, updatedData)
        .then(() => {
         
          setContacts(
            contacts.map((contact) =>
              contact.id === isUpdate.id ? { ...contact, ...updatedData } : contact
            )
          );
          alert("Data berhasil diperbarui");
        })
        .catch((err) => {
          console.error('Error during PUT request:', err);
        });
    } else {
      
      let toSave = {
        name: formData.name,
        telp: formData.telp,
        email: formData.email,
      };
  
      data.push(toSave);
  
      api
        .post("/contacts", toSave)
        .then(() => {
          alert("Data berhasil ditambah");
        })
        .catch((err) => {
          console.error('Error during POST request:', err);
        });
    }
  
    setContacts(data);
    setIsUpdate({ status: false, id: null }); 
    setFormData({ name: "", telp: "", email: "" });
  }

  function handleEdit(id) {
    const foundData = contacts.find((contact) => contact.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ name: foundData.name, telp: foundData.telp, email: foundData.email });
  }

  function handleDelete(id) {
    api.delete(`/contacts/${id}`).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
      alert("Data berhasil dihapus");
    });
  }

  return (
    <div>
      <div className="bg-white pb-3 mx-auto mt-5" style={{ width: 400, border: "2px solid #000", borderRadius: "10px" }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.name}
              name="name"
            />
          </div>
          <div className="form-group mt-3">
            <label>No. Telp</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.telp}
              className="form-control"
              name="telp"
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
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              {isUpdate.status ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
   
      <div className="content">
        <List
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={contacts}
        />
      </div>
    </div>
  );
}

export default App;
