import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Checkbox, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'; // Import the Delete icon

function EmployeeTable({ employees, onEdit, onDelete, onAddEmployee }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...Array(employees.length).keys()]);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      const updatedEmployees = employees.filter((employee, index) => !selectedRows.includes(index));
      setSelectedRows([]);
      setSelectAll(false);
      onDelete(updatedEmployees);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', marginBottom: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: 'purple', marginBottom: '10px' }}>User Details</Typography>
        <Box>
          <Button variant="contained" color="success" onClick={onAddEmployee} style={{ color: 'white', marginRight: '5px' }}>Add New Employee</Button>
          <Button variant="contained" color="error" onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>Delete Selected</Button>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <HeaderTableCell>Profile Photo</HeaderTableCell>
              <HeaderTableCell>Name</HeaderTableCell>
              <HeaderTableCell>Email</HeaderTableCell>
              <HeaderTableCell>Gender</HeaderTableCell>
              <HeaderTableCell>Phone Number</HeaderTableCell>
              <HeaderTableCell>Action</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <img src={employee.profilePhoto} alt="Profile" style={{ width: '50px', height: 'auto' }} />
                </TableCell>
                <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => onEdit(index)} color="success" startIcon={<Edit />} size="small" style={{ margin: '0'}}></Button>
                  <Button onClick={() => onDelete(index)} color="error" startIcon={<Delete />} size="small" style={{ margin: '0' }}></Button> {/* Replaced with Delete icon */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// Custom Header Table Cell component
function HeaderTableCell({ children, align }) {
  return (
    <TableCell align={align}>
      <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: 'purple' }}>
        {children}
      </Typography>
    </TableCell>
  );
}

export default EmployeeTable;
















