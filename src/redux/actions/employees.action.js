import {
    addEmployeeFailure,
    addEmployeeStart,
    addEmployeeSuccess,
    deleteEmployeeFailure,
    deleteEmployeeStart,
    deleteEmployeeSuccess,
    getAllEmployeesFailure,
    getAllEmployeesStart,
    getAllEmployeesSuccess,
    updateEmployeeFailure,
    updateEmployeeStart,
    updateEmployeeSuccess,
} from "../slices/employees.slice";
import { customAxios, customFormAxios } from "../../utils/customAxios";

// add new employee
// ---------------
const addNewEmployAction = (formData) => async (dispatch) => {
    dispatch(addEmployeeStart());
    try {
        const res = await customFormAxios.post("/employ/create", formData);
        // console.log("add new employ success", res.data);
        dispatch(addEmployeeSuccess(res.data));
    } catch (error) {
        // console.log("add new employ failure", error);
        dispatch(addEmployeeFailure(error?.response?.data?.message || "Error While Adding Employee"));
    }
};

// update employee
// ---------------
const updateEmployAction = (id, formData) => async (dispatch) => {
    dispatch(updateEmployeeStart());
    try {
        const res = await customFormAxios.put(`/employ/single/${id}`, formData);
        // console.log("update employ success", res.data);
        dispatch(updateEmployeeSuccess(res.data));
    } catch (error) {
        // console.log("update employ failure", error);
        dispatch(updateEmployeeFailure(error?.response?.data?.message || "Error While Updating Employee"));
    }
};

// delete employee
// ---------------
const deleteEmployAction = (id) => async (dispatch) => {
    dispatch(deleteEmployeeStart());
    try {
        const res = await customAxios.delete(`/employ/single/${id}`);
        // console.log("delete employ success", res.data);
        dispatch(deleteEmployeeSuccess(res.data));
    } catch (error) {
        // console.log("delete employ failure", error);
        dispatch(deleteEmployeeFailure(error?.response?.data?.message || "Error While Deleting Employee"));
    }
};

// get all employees
// ---------------------
const getAllEmployeesAction = () => async (dispatch) => {
    dispatch(getAllEmployeesStart());
    try {
        const res = await customAxios.get("/employ/all");
        // console.log("get all employees success", res.data);
        dispatch(getAllEmployeesSuccess(res.data));
    } catch (error) {
        // console.log("get all employees failure", error);
        dispatch(
            getAllEmployeesFailure(error?.response?.data?.message || "Error While Getting All Employees")
        );
    }
};

export { addNewEmployAction, updateEmployAction, deleteEmployAction, getAllEmployeesAction };
