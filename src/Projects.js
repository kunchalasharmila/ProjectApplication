import React, { useEffect, useState } from 'react';
import './Projects.css';
import Form from './Form';
import { getData, deleteData, PostData, putData } from './api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  
    const [initialForm, setForm] = useState({
        projectName: '',
        projectdescription: '',
        userId: '',
        createdDate: ''
    });
    const [view, setView] = useState('Table');
   
    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const res = await getData();
            setProjects(res.data.data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    const deleteProjects = async (projectId) => {
        try {
            await deleteData(projectId);
            getProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
        
    };

    const addOrEditProject = async (data) => {
        const projectData = {
            projectName: data.projectName,
            projectdescription: data.projectdescription,
            userId: data.userId,
            createdDate: data.createdDate
        };

        try {
            if (edit) {
                await putData(initialForm.projectId, projectData); 
            } else {
                await PostData(projectData);
            }
            getProjects(); 
            setOpenForm(false);
            setEdit(false); 
            setForm({ projectName: '', projectdescription: '', userId: '', createdDate: '' });
        } catch (error) {
            console.error("Failed to save project:", error);
            setErrorMessage('Failed to save project. Please try again.');  
        }
    };

    const editProject = (data) => {
        setForm(data);
        setOpenForm(true);
        setEdit(true);
    };
    
    const showForm = () => {
        setOpenForm(true);
        setEdit(false);
        setForm({ projectName: '', projectdescription: '', userId: '', createdDate: '' }); 
    };

    const closeForm = () => {
        setOpenForm(false);
        setErrorMessage(''); 
    };

    return (
        <div className="wrapper w-60">
            <h2 className="text-primary center">Project Management</h2>
            <button className="btn btn-primary" onClick={showForm}>Add Project</button>
            <button className="btn btn-secondary" onClick={() => setView('cards')}>View as Cards</button>
            <button className="btn btn-secondary" onClick={() => setView('table')}>View as Table</button>

            {view === 'cards' ? (
                <div className="card-container">
                    {projects.map((project) => (
                        <div className="project-card" key={project.projectId}>
                            <h3>{project.projectName}</h3>
                            <p>{project.projectdescription}</p>
                            <p>User ID: {project.userId}</p>
                            <p>Created Date: {project.createdDate}</p>
                            <div className="card-buttons">
                                <button className="btn btn-primary" onClick={() => editProject(project)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteProjects(project.projectId)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ProjectID</th>
                            <th>ProjectName</th>
                            <th>Description</th>
                            <th>UserID</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((data) => (
                                <tr key={data.projectId}>
                                    <td>{data.projectId}</td>
                                    <td>{data.projectName}</td>
                                    <td>{data.projectdescription}</td>
                                    <td>{data.userId}</td>
                                    <td>{data.createdDate}</td>
                                    <td>
                                        <button className='btn btn-primary m-1' onClick={() => editProject(data)}>Edit</button>
                                        <button className='btn btn-danger m-1' onClick={() => deleteProjects(data.projectId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No Projects available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            
            {openForm && 
                <Form 
                    closeForm={closeForm} 
                    data={initialForm} 
                    add={addOrEditProject} 
                    errorMessage={errorMessage} 
                    setErrorMessage={setErrorMessage}  
                />
            }
        </div>
    );
};

export default Projects;
