import { render, screen } from '@testing-library/react';
import { editEmployee } from './empdirectory';

test('editEmployee function sets employee name, department, and id', () => {
  const employees = {
    id: 1,
    empname: 'John Doe',
    empdepartment: 'Engineering',
  };

  // Mock the state setter functions
  const setEmpName = jest.fn();
  const setEmpDepartment = jest.fn();
  const setId = jest.fn();

  // Call the editEmployee function
  editEmployee(employees, setEmpName, setEmpDepartment, setId);

  // Check if the state setter functions were called with the correct values
  expect(setEmpName).toHaveBeenCalledWith('John Doe');
  expect(setEmpDepartment).toHaveBeenCalledWith('Engineering');
  expect(setId).toHaveBeenCalledWith(123);
});import { render, screen } from '@testing-library/react';
import { editEmployee } from './empdirectory';

test('editEmployee function sets employee name, department, and id', () => {
  const employees = {
    id: 1,
    empname: 'John Doe',
    empdepartment: 'Engineering',
  };

  // Mock the state setter functions
  const setEmpName = jest.fn();
  const setEmpDepartment = jest.fn();
  const setId = jest.fn();

  // Call the editEmployee function
  editEmployee(employees, setEmpName, setEmpDepartment, setId);

  // Check if the state setter functions were called with the correct values
  expect(setEmpName).toHaveBeenCalledWith('John Doe');
  expect(setEmpDepartment).toHaveBeenCalledWith('Engineering');
  expect(setId).toHaveBeenCalledWith(123);
});

test('DeleteEmployee function deletes employee and resets state', async () => {
  // Mock the axios.delete function
  axios.delete = jest.fn().mockResolvedValueOnce();

  // Mock the alert function
  window.alert = jest.fn();

  // Mock the state setter functions
  const setId = jest.fn();
  const setEmpName = jest.fn();
  const setEmpDepartment = jest.fn();
  const Load = jest.fn();

  // Call the DeleteEmployee function
  await DeleteEmployee(1);

  // Check if the axios.delete function was called with the correct URL
  expect(axios.delete).toHaveBeenCalledWith("https://localhost:44349/api/Employee/DeleteEmployee/1");

  // Check if the alert function was called with the correct message
  expect(window.alert).toHaveBeenCalledWith("Employee deleted Successfully");

  // Check if the state setter functions were called with the correct values
  expect(setId).toHaveBeenCalledWith("");
  expect(setEmpName).toHaveBeenCalledWith("");
  expect(setEmpDepartment).toHaveBeenCalledWith("");

  // Check if the Load function was called
  expect(Load).toHaveBeenCalled();
});