import React from "react";
import { LoginForm } from "../components/LoginForm";
import SantaListPage from '../pages/SantaListPage';

const HomePage = () => {

if (localStorage.getItem('token')) {
        return <SantaListPage />
    }
    else {
        return <LoginForm />
    }
};

export default HomePage;