import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";

const List = ({ data, handleEdit, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const [urlPhoto, setUrlPhoto] = React.useState(false);

  const handleClickOpen = (photo) => {
    setOpen(true);
    setUrlPhoto(photo);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={contact.photo}
                  alt={contact.name}
                  className="table-image"
                  onClick={() => handleClickOpen(contact.photo)}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.telp}</td>
              <td>{contact.email}</td>
              <td className="action-btns">
                <button
                  onClick={() => handleEdit(contact.id)}
                  className="button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="button-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.map((contact) => (
        <Accordion className="accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div>{contact.name}</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="img-container">
              <img
                src={contact.photo}
                alt={contact.name}
                className="img-accordion"
              />
            </div>

            <div className="accordion-container">
              <div>Phone Number</div>
              <div>{contact.telp}</div>
            </div>
            <div className="accordion-container">
              <div>Email</div>
              <div>{contact.email}</div>
            </div>

            <div className="accordion-action">
              <button
                onClick={() => handleEdit(contact.id)}
                className="btn btn-warning"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="btn btn-new"
              >
                Delete
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog onClose={handleClose} open={open}>
        <img src={urlPhoto} alt={urlPhoto} className="img-accordion-zoom" />
      </Dialog>
    </div>
  );
};

export default List;
