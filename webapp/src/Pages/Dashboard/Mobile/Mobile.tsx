import React from "react";
import './Mobile.css';
import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Item } from "../../../Components/item";
import Cookies from "universal-cookie";

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

export default function Mobile() {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [phone, setPhone] = React.useState('');
    const [name, setName] = React.useState('');

    // Display data
    const [chartData, setChartData] = React.useState([{name: 'Week 1', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 2', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 3', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 4', uv: 0, pv: 2400, amt: 2400}])
    const [roster, setRoster] = React.useState([])
    const [feed, setFeed] = React.useState<any[]>([])
    const [selected, setSelected] = React.useState<any[]>([])

    const cookies = new Cookies();

    const onRowsSelectionHandler = (ids: any[]) => {
        const selectedRowsData = ids.map((id: any) => roster.find((row: { id: any; }) => row.id === id));
        setSelected(selectedRowsData)
    };

    const submit = () => {
        fetch('http://localhost:3001/addToRoster', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "authorization": cookies.get("token")
            },
            body: JSON.stringify({number: phone, name: name})
        }).then((response) => {
            return response.json();
        }
        ).then((data1) => {
            console.log(data1);
            window.location.reload()
        });
    }

    const deleteFromRoster = () => {
        fetch('http://localhost:3001/removeFromRoster', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "authorization": cookies.get("token")
            },
            body: JSON.stringify(selected)
        }).then((response) => {
            return response.json();
        }
        ).then((data) => {
            console.log(data);
            window.location.reload()
        });
    }

    const timeConverter = (UNIX_timestamp: number) => {
        var a = new Date(UNIX_timestamp / 1000);
        return a.toString();
    }

    React.useEffect(() => {
        fetch(`http://localhost:3001/getPrivateIncidents`, {
            "headers": {
                authorization: cookies.get("token")
            },
            "method": "GET",
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            console.log(data);
            if(data.incidents) {
                setFeed(data.incidents);
            }
        });
        
        fetch(`http://localhost:3001/getIncidentBusinessChart`, {
            "headers": {authorization: cookies.get("token")},
            "method": "GET",
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            setChartData(data);
        });

        fetch("http://localhost:3001/getRoster", {
            "headers": {authorization: cookies.get("token")},
            "method": "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setRoster(data);
        });
        
        fetch("http://localhost:3001/getRoster", {
            "headers": {authorization: cookies.get("token")},
            "method": "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setRoster(data);
        });
    }, [])

    return (
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={(e: any) => setChecked(e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label={checked ? "Community" : "Internal"}
                            />
                            
                            <Card sx={{ maxWidth: 500, minWidth: 300, minHeight: 700, maxHeight: 700 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                        Manage Team
                                    </Typography>
                                    <div style={{ height: '50px', marginTop: '10px' }}>
                                        <button className="MobileTableUtil" onClick={() => setOpen(true)}>Add Member</button>
                                        <button className="MobileTableUtil" style={{marginLeft: '10px'}} onClick={() => deleteFromRoster()}>Remove</button>
                                    </div>
                                    <div style={{ height: 400, maxWidth: '500px' }}>
                                        <DataGrid
                                            rows={roster}
                                            columns={columns}
                                            checkboxSelection
                                            onRowSelectionModelChange={(ids: any) => onRowsSelectionHandler(ids)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card sx={{ maxWidth: 500, minWidth: 300, minHeight: 700, maxHeight: 700  }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                        Incident Overview
                                    </Typography>
                                    <div>
                                    <LineChart width={450} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card sx={{ maxWidth: 500, minWidth: 300, minHeight: 700, maxHeight: 700  }}>
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
                                                {feed.length > 0 ? feed.map((row, i) => (
                                                    <TableRow
                                                        key={i}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <a href={row.image} target='_blank' rel="noreferrer">{timeConverter(row.date)}</a>
                                                        </TableCell>
                                                        <TableCell align="right">{row.location}</TableCell>
                                                    </TableRow>
                                                )) : null}
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