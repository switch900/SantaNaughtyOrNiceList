import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const SantaList = exceptId => {
    const [childInfo, setChildInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
           
                const result = await fetch('https://santaapi20191123012550.azurewebsites.net/Santalists', {
               //const result = await fetch('https://localhost:44367/Santalists', {
                method: 'get',
                headers: new Headers({
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                    "Cache-Control": "no-cache",
                    "Host": "localhost:44367",
                    "Connection": "keep-alive",
 
                })
            });
            try {
                const body = await result.json();
                setChildInfo(body);
            }
            catch (exception) {
                window.location.href = '/login';
            }
        };
        fetchData();
    }, []);

    var others = childInfo;

    // eslint-disable-next-line eqeqeq
    if (exceptId != undefined) {
        // eslint-disable-next-line eqeqeq
        others = Object.values(childInfo).filter(p => p.id != exceptId.exceptId);
    }

    return (
        <>
            {others.map((person, key) => (
                <Link key={key} to={`/detail/${person.id}`} className="mr-sm-2">
                    <div style={{ border: "1px solid" }}>
                    <h5>User Name: {person.userName}</h5>
                        <h6>Child's Name: {person.firstName} {person.lastName}</h6>
                        </div>
                </Link>
            ))}
        </>
    );
};

export default SantaList;
