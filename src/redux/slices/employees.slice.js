import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    loading: false,
    error: "",
    message: "",
};

const employeesSlice = createSlice({
    name: "employ",
    initialState,
    reducers: {
        // add employ
        // --------------
        addEmployeeStart: (state) => {
            state.loading = true;
        },
        addEmployeeSuccess: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },
        addEmployeeFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // delete employee
        // --------------
        deleteEmployeeStart: (state) => {
            state.loading = true;
        },
        deleteEmployeeSuccess: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },
        deleteEmployeeFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // update employee
        // --------------
        updateEmployeeStart: (state) => {
            state.loading = true;
        },
        updateEmployeeSuccess: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },
        updateEmployeeFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        //  get all employees
        // --------------
        getAllEmployeesStart: (state) => {
            state.loading = true;
        },
        getAllEmployeesSuccess: (state, action) => {
            state.employees = action.payload.employees;
            state.loading = false;
        },
        getAllEmployeesFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // clear message
        clearEmployMessage: (state) => {
            state.message = "";
        },
        // clear error
        clearEmployError: (state) => {
            state.error = "";
        },
    },
});

export const {
    addEmployeeStart,
    addEmployeeSuccess,
    addEmployeeFailure,
    deleteEmployeeStart,
    deleteEmployeeSuccess,
    deleteEmployeeFailure,
    updateEmployeeStart,
    updateEmployeeSuccess,
    updateEmployeeFailure,
    getAllEmployeesStart,
    getAllEmployeesSuccess,
    getAllEmployeesFailure,
    clearEmployMessage,
    clearEmployError,
} = employeesSlice.actions;
export default employeesSlice;
