import React from "react";
import SantaList from "../components/SantaList";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ChildDetailPage = ({ match }) => {
    const id = match.params.id;
    localStorage.setItem('userId', id);
   
    const [childInfo, setChildInfo] = useState({
        id: "",
        concurrencyStamp: "",
        longitude: -110,
        latitude: 49,
        isNaughty: false
    });

    useEffect(() => {
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + id
      //  const url = 'https://localhost:44367/santalists/' + id;
        const fetchData = async () => {
            const result = await fetch(url, {
                method: 'get',
                headers: new Headers({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
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
    }, [id]);

    if (!childInfo) return <NotFoundPage />;
    localStorage.setItem('concurrencyStamp', childInfo.concurrencyStamp);

    const myChangeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setChildInfo({ ...childInfo, [name]: value });
        updateChild()
    }

    function updateChild() {
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + id
         //const url = 'https://localhost:44367/santalists/' + id
        fetch(url, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                password: childInfo.password,
                firstName: childInfo.firstName,
                lastName: childInfo.lastName,
                birthDate: childInfo.birthDate,
                street: childInfo.street,
                city: childInfo.city,
                province: childInfo.province,
                postalCode: childInfo.postalCode,
                country: childInfo.country,
                latitude: childInfo.latitude,
                longitude: childInfo.longitude,
                isNaughty: !childInfo.isNaughty,
                dateCreated: childInfo.dateCreated,
                id: childInfo.id,
                userName: childInfo.userName,
                normalizedUserName: childInfo.normalizedUserName,
                email: childInfo.email,
                normalizedEmail: childInfo.normalizedEmail,
                emailConfirmed: childInfo.emailConfirmed,
                passwordHash: childInfo.passwordHash,
                securityStamp: childInfo.securityStamp,
                concurrencyStamp: childInfo.concurrencyStamp,
                phoneNumber: childInfo.phoneNumber,
                phoneNumberConfirmed: childInfo.phoneNumberConfirmed,
                twoFactorEnabled: childInfo.twoFactorEnabled,
                lockoutEnd: childInfo.lockoutEnd,
                lockoutEnabled: childInfo.lockoutEnabled,
                accessFailedCount: childInfo.accessFailedCount 
            })
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(console.log)
    }

    return (
        <React.Fragment>
            <table style={{ width: "90%", margin: "auto" }}>
                <tbody>
                    <tr>
                        <td>
                            <h4 className="text-info">
                                
                                {localStorage.getItem('credentials') === 'Admin' ? (
                                    childInfo.isNaughty ? <div style={{ color: "red" }}>Naughty</div> : <div>Good</div>

                                ) : (
                                       <div> Welcome to your profile page </div>
                                    )}
                                {childInfo.firstName} {childInfo.lastName}
                                   </h4>
                            
                            <hr />
                        </td>                 
                        <td>
                            
                            </td>
                    </tr>
                    <tr>
                        <td style={{ verticalAlign: "top" }}>
                            <div style={{ height: '65vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyAEfsMGuiIMGws9Lu9frXRrLOrqOATmdjI' }}
                                    defaultCenter={{ lat: 0, lng: 0 }}
                                    center={{ lat: childInfo.latitude, lng: childInfo.longitude }}
                                    defaultZoom={10}
                                    yesIWantToUseGoogleMapApiInternals
                                >
                                    <AnyReactComponent
                                        lat={childInfo.latitude}
                                        lng={childInfo.longitude}
                                        text={"<- " + childInfo.firstName + "'s Chimney"}
                                    />
                                </GoogleMapReact>
                            </div>
                        </td>
                        <td style={{ width: "35%", verticalAlign: "top" }}>
                            <p>
                                <b>Street: </b>
                                {childInfo.street}
                            </p>
                            <p>
                                <b>City: </b>
                                {childInfo.city}
                            </p>
                            <p>
                                <b>Province: </b>
                                {childInfo.province}
                            </p>
                            <p>
                                <b>Country: </b>
                                {childInfo.country}
                            </p>
                            <p>
                                <b>Postal Code: </b>
                                {childInfo.postalCode}
                            </p>
                            <p>
                                <b>Birth Date: </b>
                                {childInfo.birthDate}

                    </p>
                            {localStorage.getItem('credentials') === 'Admin' ? (


                                    <label className="checkbox-inline">
                                        <input
                                        type='checkbox'
                                        className="form-control"
                                        name='isNaughty'
                                        checked={childInfo.isNaughty}
                                        onChange={myChangeHandler}
                                        />
                                        <b>Click here if Naughty!</b></label>


                               
                            ) : (
                                    <Link key={childInfo.id} to={`/edit/${childInfo.id}`}>
                                        <button
                                            style={{ position: "block" }}
                                            className="btn btn-primary"
                                            type='button'
                                            text='Edit Profile'
                                        >Edit Profile</button>
                                    </Link>
                                )}
                        </td>
                    </tr>
                   
                    <tr>
                            {localStorage.getItem('credentials')==='Admin' ? (
                                <td>
                                    <h3>Others:</h3>
                                    <SantaList exceptId={childInfo.id} />
                                </td>
                        ) : (
                                <td>
                                    </td>
                                )}
                    </tr>
                </tbody>
            </table>

        </React.Fragment >
    );
};
export default ChildDetailPage;