import React from 'react';

const AdminPanel = () => {
    return (
        <div className="mt-5 container">
            <h1 className="App">Admin Panel</h1>
            <div className="d-flex align-items-center mt-5">
                <div className="col-md-3"><a href='/addStudent'>Add Student</a></div>
                <div className="col-md-3"><a href=''>Add Student</a></div>
                <div className="col-md-3"><a href=''>Add Student</a></div>
                <div className="col-md-3"><a href=''>Add Student</a></div>
            </div>
        </div>

        
    );
};

export default AdminPanel;