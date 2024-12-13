import React from 'react';
import './Projects.css';
import './Table.css';

function Table(props) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ProjectID</th>
            <th>ProjectName</th>
            <th>Description</th>
            <th>UserId</th>
            <th>CreatedDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.projects.length > 0 ? (
            props.projects.map((data) => (
              <tr key={data.projectId}>
                <td>{data.projectId}</td>
                <td>{data.projectName}</td>
                <td>{data.projectdescription}</td>
                <td>{data.userId}</td>
                <td>{data.createdDate}</td>
                <td>
                  <div className="button-group">
                    <button className='btn btn-primary' onClick={() => { props.edit(data); }}>Edit</button>
                    <button className='btn btn-danger' onClick={() => { props.delete(data.projectId); }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No Projects available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
