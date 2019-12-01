import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export const Contacts = ({ contacts }) => {
    return (
        <div>
            {contacts.map((contact,key) => (
                <Link key={key} to={`/detail/${contact.id}`}>
                <div className="card" key={contact.id}>
                    <div className="card-body">
                        <h5 className="card-title">{contact.firstName} {contact.lastName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{contact.isNaughty}</h6>
                        <p className="card-text">{contact.city}</p>
                    </div>
                    </div>
                    </Link>
            ))}
        </div>
    )
};

