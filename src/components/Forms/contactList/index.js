import React from "react";
import ContactListItem from "./contact-item/index";

export default function ContactList({
  contacts,
  handleRemoveContact,
  handleEditContact,
}) {
  return (
    <div className="container">
      <h4>კონტაქტები</h4>
      <div>
        {contacts &&
          contacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              removeContact={handleRemoveContact}
              editContact={handleEditContact}
            />
          ))}
      </div>
    </div>
  );
}
