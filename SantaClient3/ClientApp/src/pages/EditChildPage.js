import React from "react";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditChildPage = ({ match }) => {
    const id = match.params.id;
    localStorage.setItem('userId', id);

    const [childInfo, setChildInfo] = useState({
        validateErrors: {
            userNameError: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            longitudeError: "",
            latitudeError: ""
        },
        userName: "",
        accessFailedCount: 0,
        birthDate: new Date(),
        city: "",
        concurrencyStamp: "",
        country: "",
        dateCreated: new Date(),
        email: "",
        emailConfirmed: false,
        firstName: "",
        id: id,
        isNaughty: false,
        lastName: "",
        latitude: "",
        lockoutEnabled: false,
        lockoutEnd: "",
        longitude: "",
        normalizedEmail: "",
        normalizedUserName: "",
        password: "",
        passwordHash: "",
        phoneNumber: "",
        phoneNumberConfirmed: false,
        postalCode: "",
        province: "",
        securityStamp: "",
        street: "",
        twoFactorEnabled: false
    });

    const myChangeHandler = event => {
        //let fields = childInfo;
        //fields[event.target.name] = event.target.value;
        //setChildInfo({...childInfo, [fields] : fields });
        const { name, value } = event.target
        setChildInfo({ ...childInfo, [name]: value })
    }

    const mySubmitHandler = event => {      
        event.preventDefault();
   //     if (handleValidation()) {
        updateChild();
        window.location.href = '/detail/' + localStorage.getItem('id');
        //} else {
        //    alert("Form has errors.")
        //}
    }

    const handleChange = date => {
        setChildInfo({ ...childInfo, birthDate: date })
    };

    const handleValidation = event => {
       // let errors = {};
        let formIsValid = true;

        //UserName
        if (!childInfo.userName) {
            formIsValid = false;
            childInfo.userNameError = "Cannot be empty";
        }

        //Email
        if (!childInfo.email) {
            formIsValid = false;
            childInfo.emailError = "Cannot be empty";
        }

        if (typeof childInfo.email !== "undefined") {
            let lastAtPos = childInfo.email.lastIndexOf('@');
            let lastDotPos = childInfo.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && childInfo.email.indexOf('@@') === -1 && lastDotPos > 2 && childInfo.email.length - lastDotPos) > 2) {
                formIsValid = false;
                childInfo.emailError = "Email is not valid";
            }

            //FirstName
            if (!childInfo.firstName) {
                formIsValid = false;
                childInfo.firstNameError = "Cannot be empty";
            }

            //LastName
            if (!childInfo.lastName) {
                formIsValid = false;
                childInfo.lastNameError = "Cannot be empty";
            }

            if (!childInfo.longitude) {
                formIsValid = false;
                childInfo.longitudeError = "Cannot be empty";
            }
            if (childInfo.longitude > 180 || childInfo.longitude < -180) {
                formIsValid = false;
                childInfo.longitudeError = "Longitude must be between -180 and 180";
            }

            if (!childInfo.latitude) {
                formIsValid = false;
                childInfo.latitudeError = "Cannot be empty";
            }

            if (childInfo.latitude > 90 || childInfo.latitude < -90) {
                formIsValid = false;
                childInfo.latitudeError = "Latitude must be between -90 and 90";
            }
        }
        //setChildInfo({ ...childInfo, validateErrors: errors })
        //console.log(childInfo.validateErrors);
     //   setChildInfo(childInfo.validateErrors = errors);
        return formIsValid;
    }

    useEffect(() => {
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + localStorage.getItem('userId');
        const fetchData = async () => {
            const result = await fetch(url, {
                method: 'get',
                headers: new Headers({                  
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token'),                  
                    "Host": "santaapi20191123012550.azurewebsites.net"
                })
            });        
            const body = await result.json();
            setChildInfo(body);         
        };
        fetchData();
    }, [id]);

    if (!childInfo) return <NotFoundPage />;


    function updateChild() {    
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + childInfo.id;
        fetch(url, {
            method: 'PUT',
            headers: {            
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
                latitude: parseInt(childInfo.latitude),
                longitude: parseInt(childInfo.longitude),
                isNaughty: childInfo.isNaughty,
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
                <form onSubmit={mySubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="usr">User Name:</label>
                        <input
                            type='text'
                            defaultValue={childInfo.userName}
                            className="form-control"
                            name='userName'
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.userNameError}</span>
                    </div>                
                    <div className="form-group">
                        <label htmlFor="pwd">Email:</label>
                        <input
                            type='email'
                            name='email'
                            className="form-control"
                            defaultValue={childInfo.email}
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.emailError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="usr">First Name:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='firstName'
                            defaultValue={childInfo.firstName}
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.firstNameError}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Last Name:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='lastName'
                            defaultValue={childInfo.lastName}
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.lastNameError}</span>
                    </div>            
                    <div className="form-group">
                        <label htmlFor="usr">Street:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='street'
                            defaultValue={childInfo.street}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">City:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='city'
                            defaultValue={childInfo.city}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Province:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='province'
                            defaultValue={childInfo.province}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Postal Code:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='postalCode'
                            defaultValue={childInfo.postalCode}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Country:</label>
                        <input
                            type='text'
                            className="form-control"
                            name='country'
                            defaultValue={childInfo.country}
                            onChange={myChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Birthdate:</label>
                        <DatePicker
                            selected={Date.parse(childInfo.birthDate)}
                            onChange={handleChange}
                    />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Longitude:</label>
                        <input
                            type='int'
                            className="form-control"
                            name='longitude'
                            defaultValue={childInfo.longitude}
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.longitudeError}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="usr">Latitude:</label>
                        <input
                            type='int'
                            className="form-control"
                            name='latitude'
                            defaultValue={childInfo.latitude}
                            onChange={myChangeHandler}
                        />
                        <span style={{ color: "red" }}>{childInfo.latitudeError}</span>
                    </div>

                    <input className="btn btn-primary"
                        type='submit'
                        text='Login'
                    />
                </form>

            </React.Fragment >
        );
    };
export default EditChildPage;
