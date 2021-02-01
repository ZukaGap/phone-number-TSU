import React, { useState, useEffect } from "react";
import AppLayout from "../../layout/AppLayout/index";
import Search from "../../Forms/search/index";
import * as db from "../../../db";
import { Empty } from "antd";
import ContactList from "../../Forms/contactList/index";
import AddContact from "../../Forms/AddContact/index";

export default function Dashboard() {
  const [contacts, setContacts] = useState(db.getContacts());
  const [searchValue, setSearchValue] = useState("");
  const [addForm, setAddForm] = useState(false);

  useEffect(() => {
    const data = db
      .getContacts()
      .filter((contact) =>
        contact.name.toUpperCase().includes(searchValue.toUpperCase())
      );
    setContacts(data);
  }, [searchValue]);

  const handleRemoveContact = ({ id }) => {
    const newList = contacts.filter((item) => item.id !== id);
    setContacts(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  const handleEditContact = ({ id, email, phone, name }) => {
    const newList = contacts
      .filter((item) => item.id !== id)
      .concat({ id, email, phone, name });
    setContacts(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  return (
    <AppLayout>
      <Search
        searchValue={searchValue}
        showAddForm={() => setAddForm(true)}
        handleSearch={(e) => setSearchValue(e.target.value)}
      />
      {addForm ? (
        <AddContact
          close={() => setAddForm(false)}
          handleAddContact={(contact) =>
            setContacts((prev) => [...prev, contact])
          }
        />
      ) : contacts.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
        />
      ) : (
        <ContactList
          contacts={contacts}
          handleRemoveContact={handleRemoveContact}
          handleEditContact={handleEditContact}
        />
      )}
    </AppLayout>
  );
}
