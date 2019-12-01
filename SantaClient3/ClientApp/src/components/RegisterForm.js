import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
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
            latitude: 0
        };
    }
    myChangeHandler = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            alert("Form submitted");
            this.userLogin();
        } else {
            alert("Form has errors.")
        }
    }

    handleChange = date => {
        this.setState({
            birthDate: date
        });
    };

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //UserName
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }

        //Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        console.log(fields);
        var rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        if (!rgx.test(fields["password"])) {
            errors["password"] = "Password must contain lowercase, uppercase, number, and special character";
            formIsValid = false;
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }

            //FirstName
            if (!fields["firstname"]) {
                formIsValid = false;
                errors["firstname"] = "Cannot be empty";
            }

            //LastName
            if (!fields["lastname"]) {
                formIsValid = false;
                errors["lastname"] = "Cannot be empty";
            }

            if (!fields["longitude"]) {
                formIsValid = false;
                errors["longitude"] = "Cannot be empty";
            }
            if (parseInt(fields["longitude"]) > 180 || parseInt(fields["longitude"]) < -180) {
                formIsValid = false;
                errors["longitude"] = "Longitude must be between -180 and 180";
            }

            if (!fields["latitude"]) {
                formIsValid = false;
                errors["latitude"] = "Cannot be empty";
            }

            if (parseInt(fields["latitude"]) > 90 || parseInt(fields["latitude"]) < -90) {
                formIsValid = false;
                errors["latitude"] = "Longitude must be between -90 and 90";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    userLogin() {
        fetch('https://santaapi20191123012550.azurewebsites.net/auth/register', {
      //  fetch('https://localhost:44367/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserName: this.state.username,
                Password: this.state.password,
                Email: this.state.email,
                FirstName: this.state.firstname,
                LastName: this.state.lastname,
                BirthDate: this.state.birthDate,
                Street: this.state.street,
                City: this.state.city,
                Province: this.state.province,
                PostalCode: this.state.postalCode,
                Country: this.state.country,
                Longitude: parseInt(this.state.longitude),
                Latitude: parseInt(this.state.latitude)
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
                        className="form-control"
                        name='username'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["userName"]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Email:</label>
                    <input
                        type='email'
                        name='email'
                        className="form-control"
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                </div>

                <div className="form-group">
                    <label htmlFor="usr">First Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='firstname'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Last Name:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='lastname'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
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
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">City:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='city'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Province:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='province'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Postal Code:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='postalCode'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Country:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='country'
                        onChange={this.myChangeHandler}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Longitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='longitude'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["longitude"]}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="usr">Latitude:</label>
                    <input
                        type='int'
                        className="form-control"
                        name='latitude'
                        onChange={this.myChangeHandler}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["latitude"]}</span>
                </div>

                <input className="btn btn-primary"
                    type='submit'
                    text='Login'
                />
            </form>
        );
    }
}

ReactDOM.render(<RegisterForm />, document.getElementById('root'));