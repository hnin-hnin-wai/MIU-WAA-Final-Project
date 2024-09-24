import React from 'react';
import './customer.css'; // Import custom CSS file for styling

const CustomerLandingPage = () => {
    return (
        <div className="customer-landing-page mt-4">
            <div className="overlay"></div>
            <div className="content">
                <h1>You have successfully logged in! </h1>
                <p>1. Use the sidebar on the left to browse for properties</p>
                <p>2. When you get new messages it will appear on the top near message icon</p>
            </div>
        </div>
    );
}

export default CustomerLandingPage;