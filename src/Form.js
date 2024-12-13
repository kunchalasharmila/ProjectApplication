import React, { useState, useEffect } from 'react';
import './Form.css';

function Form(props) {
    const [project, setProject] = useState({
        projectName: '',
        projectdescription: '',
        userId: '',
        createdDate: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (props.data) {
            setProject(props.data);
        }
    }, [props.data]);

    const changeFormData = (event) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    // Validating form data
    const validateForm = () => {
        if (!project.projectName || project.projectName.trim() === "" || project.projectName.trim().toLowerCase() === 'null') {
            return "Project name cannot be null or empty";
        }
        else if (project.projectName.length < 3 || project.projectName.length > 50) {
            return "Project Name must be between 3 and 50 characters";
        }

        // Project Description validation
        if (!project.projectdescription || project.projectdescription.trim() === "" || project.projectdescription.trim().toLowerCase() === 'null') {
            return "Project description cannot be null or empty";

        } else if (project.projectdescription.length < 5 || project.projectdescription.length > 100) {
            return "Project description must be between 5 and 50 characters";
        }

        // User ID validation
        if (!project.userId || project.userId <= 0) {
            return "User ID must be a valid positive integer";
        }

        // Created Date validation
        if (!project.createdDate) {
            return "Created date cannot be empty";
        }
        const currentDate = new Date();
        const createdDate = new Date(project.createdDate);
        if (createdDate > currentDate) {
            return "Created date cannot be in the future";
        }

        return null; 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const validationError = validateForm();
        if (validationError) {
            props.setErrorMessage(validationError);  
            return;
        }

        props.add(project); 
        setSubmitted(false); 
    };

    return (
        <div className="form-overlay">
            <form onSubmit={handleSubmit}>  
                {props.errorMessage && (
                    <div className="alert alert-danger">{props.errorMessage}</div>
                )}

                <div className="form-group">
                    <label>Project Name:</label>
                    <input
                        className="form-control mt-2"
                        type="text"
                        name="projectName"
                        placeholder="Enter ProjectName"
                        value={project.projectName}
                        onChange={changeFormData}
                    />
                </div>

                <div className="form-group">
                    <label>Project Description:</label>
                    <input
                        className="form-control mt-2"
                        type="text"
                        name="projectdescription"
                        placeholder="Enter project description"
                        value={project.projectdescription}
                        onChange={changeFormData}
                    />
                </div>

                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        className="form-control mt-2"
                        type="number"
                        name="userId"
                        placeholder="Enter user ID"
                        value={project.userId}
                        onChange={changeFormData}
                    />
                </div>

                <div className="form-group">
                    <label>Created Date:</label>
                    <input
                        className="form-control mt-2"
                        type="date"
                        name="createdDate"
                        value={project.createdDate}
                        onChange={changeFormData}
                    />
                </div>

                <div className="button-group mt-3">
                    <button type="submit" className="btn btn-primary float-end">Save</button>
                    <button className="btn btn-danger float-end" 
                        onClick={(e) => {
                            e.preventDefault();
                            props.closeForm();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
