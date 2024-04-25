import './App.css';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import EmployeeTable from './Components/EmployeeTable';
import EmployeeFormDialog from './Components/EmployeeFormDialog';
function App() {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpenFormDialog(true);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleAdd = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setEditIndex(null);
  };

  const handleSaveEmployee = (data) => {
    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = data;
      setEmployees(updatedEmployees);
    } else {
      setEmployees([...employees, data]);
    }
    setOpenFormDialog(false);
    setEditIndex(null);
  };

  return (
    <div>
      <Button onClick={handleAdd} variant="contained" color="primary" style={{ marginBottom: '20px' }}>Add New Employee</Button>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      <EmployeeFormDialog open={openFormDialog} onClose={handleCloseFormDialog} onSave={handleSaveEmployee} employee={employees[editIndex]} />
    </div>
  );
}

export default App;

