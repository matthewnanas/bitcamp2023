import React from "react";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'First name', width: 130 },
    {
        field: 'Phone',
        headerName: 'Phone Number',
        type: 'number',
        width: 120,
    },
];