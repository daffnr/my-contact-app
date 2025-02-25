import React, { useState, useEffect } from "react";
import List from "./components/List";
import Form from "./components/Form";
import initialContacts from "./data";
import "../src/App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    name: "",
    telp: "",
    email: "",
    photo: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      setContacts(storedContacts);
    } else {
      setContacts(initialContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name === "" || formData.telp === "" || formData.email === "") {
      alert("Please fill in all fields.");
      return false;
    }

    if (isUpdate.status) {
      const updatedData = {
        name: formData.name,
        telp: formData.telp,
        email: formData.email,
        photo: preview,
      };

      setContacts(
        contacts.map((contact) =>
          contact.id === isUpdate.id ? { ...contact, ...updatedData } : contact
        )
      );
      alert("Data berhasil diperbarui");
    } else {
      const newId = contacts.length + 1;
      const newContact = {
        id: newId,
        name: formData.name,
        telp: formData.telp,
        email: formData.email,
        photo: preview || "https://randomuser.me/api/portraits/men/8.jpg",
      };

      setContacts([...contacts, newContact]);
      alert("Data berhasil ditambah");
    }

    setFormData({ name: "", telp: "", email: "", photo: "" });
    setPreview(null);
    setIsUpdate({ status: false, id: null });
    setShowForm(false);
  }

  function handleEdit(id) {
    const foundData = contacts.find((contact) => contact.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({
      name: foundData.name,
      telp: foundData.telp,
      email: foundData.email,
      photo: foundData.photo,
    });
    setPreview(foundData.photo);
    setShowForm(true);
  }

  function handleDelete(id) {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    alert("Data berhasil dihapus");
  }

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container">
      <h1>Contact App</h1>

      <div className="action-container">
        <button
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Contact
        </button>

        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="form-popup show">
          <div className="form-container">
            <button className="close-btn" onClick={() => setShowForm(false)}>X</button>
            <Form
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              preview={preview}
              isUpdate={isUpdate}
            />
          </div>
        </div>
      )}

      <List
        data={filteredContacts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
