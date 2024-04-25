import React, { useState } from 'react';
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
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} onAddEmployee={handleAdd} />
      <EmployeeFormDialog open={openFormDialog} onClose={handleCloseFormDialog} onSave={handleSaveEmployee} employee={employees[editIndex]} />
    </div>
  );
}

export default App;
