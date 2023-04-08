import React from "react";
import './Desktop.css';
import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Week 1', uv: 1, pv: 2400, amt: 2400}, {name: 'Week 2', uv: 2, pv: 2400, amt: 2400}, {name: 'Week 3', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 4', uv: 4, pv: 2400, amt: 2400}];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'First name', width: 130 },
    {
        field: 'Phone',
        headerName: 'Phone Number',
        type: 'number',
        width: 120,
    },
];

const rows = [
    { id: 1, Name: 'Matthew Nanas', Phone: '123 123 1234' },
    { id: 2, Name: 'Rohit Sharma', Phone: '123 123 1234' },
    { id: 3, Name: 'Adam Lederer', Phone: '123 123 1234' },
]

const feed = [
    {
        time: '2023-04-08T03:34:27+0000',
        location: 'Maryland'
    },
    {
        time: '2023-04-08T03:34:27+0000',
        location: 'Maryland'
    },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Desktop() {
    const [checked, setChecked] = React.useState(true);

    return (
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Card sx={{minWidth: 300, minHeight: 700, maxHeight: 700  }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                        Incident Map
                                    </Typography>
                                    <div>
                                    <LineChart width={450} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                    </div>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Card sx={{ minWidth: 300, minHeight: 700, maxHeight: 700  }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                        Captured Feed
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Time</TableCell>
                                                    <TableCell align="right">Location</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {feed.map((row, i) => (
                                                    <TableRow
                                                        key={i}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.time}
                                                        </TableCell>
                                                        <TableCell align="right">{row.location}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}