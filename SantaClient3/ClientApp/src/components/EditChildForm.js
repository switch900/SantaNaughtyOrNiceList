import React from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export class EditChildForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childInfo: [],
            userName: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
            birthDate: new Date(),
            street: '',
            city: '',
            province: '',
            postalCode: '',
            country: '',
            longitude: 0,
            latitude: 0,
            userId: ''
        };
    }

    componentDidMount() {    
                     
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + localStorage.getItem('userId');
       // const url = 'https://localhost:44367/santalists/' + localStorage.getItem('userId');
        fetch(url, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json()).then(res => {
                this.setState({ childInfo: res });
            }, function (error) {
                console.log(error.message);
            })
    }

    componentDidUpdate() {

        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + localStorage.getItem('userId');
      //  const url = 'https://localhost:44367/santalists/' + localStorage.getItem('userId');
        fetch(url, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Cache-Control": "no-cache"
            }
        })
            .then(res => res.json()).then(res => {
                    this.setState({ childInfo: res });
            }, function (error) {
                console.log(error.message);
            })
    }
    
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    mySubmitHandler = (event) => {
        this.userLogin();
        event.preventDefault();
    }

    handleChange = date => {
        this.setState({
            birthDate: date
        });
    };

    userLogin() {
        const url = 'https://santaapi20191123012550.azurewebsites.net/santalists/' + localStorage.getItem('userId');
        //const url = 'https://localhost:44367/santalists/' + localStorage.getItem('userId');
        console.log(url);
        fetch(url, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Accept": "*/*",
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDate: this.state.birthDate,
                street: this.state.street,
                city: this.state.city,
                province: this.state.province,
                postalCode: this.state.postalCode,
                country: this.state.country,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                isNaughty: this.state.isNaughty,
                dateCreated: this.state.dateCreated,
                id: this.state.id,
                userName: this.state.userName,
                normalizedUserName: this.state.normalizedUserName,
                email: this.state.email,
                normalizedEmail: this.state.normalizedEmail,
                emailConfirmed: this.state.emailConfirmed,
                passwordHash: this.state.passwordHash,
                securityStamp: this.state.securityStamp,
                concurrencyStamp: this.state.concurrencyStamp,
                phoneNumber: this.state.phoneNumber,
                phoneNumberConfirmed: this.state.phoneNumberConfirmed,
                twoFactorEnabled: this.state.twoFactorEnabled,
                lockoutEnd: this.state.lockoutEnd,
                lockoutEnabled: this.state.lockoutEnabled,
                accessFailedCount: this.state.accessFailedCount 
            })
        })
            .then(res => res.json()).then(res => {
                if (res) {
                    alert("You are now registered to Santa's List " + this.state.username);
                }
                else {
                    alert("Not a valid user or password");
                }
            }, function (error) {
                console.log(error.message); //=> String
            })
    }

    sendToken = () => {
        var token = this.state.token;
        this.props.parentCallback(token);
    }

    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <div className="form-group">
                    <label htmlFor="usr">User Name:</label>
                    <input
                        type='text'
                        defaultValue={this.state.childInfo.userName}
                        className="form-control"
                        name='username'
                        onChange={this.myChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        defaultValue={this.state.childInfo.password}
                        onChange={this.myChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Email:</label>
                    <input
                        type='email'
                        name='email'
                        className="form-control"
                        defaultValue={this.state.childInfo.email}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">First Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='firstname'
                        defaultValue={this.state.childInfo.firstName}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Last Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='lastname'
                        defaultValue={this.state.childInfo.lastName}
                        onChange={this.myChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="usr">Birthdate:</label>
                    <DatePicker                     
                        selected={this.state.birthDate}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Street:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='street'
                        defaultValue={this.state.childInfo.street}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">City:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='city'
                        defaultValue={this.state.childInfo.city}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Province:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='province'
                        defaultValue={this.state.childInfo.province}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Postal Code:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='postalCode'
                        defaultValue={this.state.childInfo.postalCode}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Country:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='country'
                        defaultValue={this.state.childInfo.country}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Longitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='longitude'
                        defaultValue={this.state.childInfo.longitude}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Latitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='latitude'
                        defaultValue={this.state.childInfo.latitude}
                        onChange={this.myChangeHandler}
                    />
                </div>

                <input className="btn btn-primary"
                    type='submit'
                    text='Login'
                />
            </form>
        );
    }
}

ReactDOM.render(<EditChildForm />, document.getElementById('root'));