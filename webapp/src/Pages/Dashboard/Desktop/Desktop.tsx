import React from "react";
import './Desktop.css';
import { Box, Card, CardContent, FormControlLabel, Grid, Modal, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Desktop() {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [phone, setPhone] = React.useState('');

    // Display data
    const [chartData, setChartData] = React.useState([{name: 'Week 1', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 2', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 3', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 4', uv: 0, pv: 2400, amt: 2400}])
    const [roster, setRoster] = React.useState([])
    const [feed, setFeed] = React.useState<any[]>([])

    const submit = () => {
        alert(phone)
    }

    React.useEffect(() => {
        fetch("http://localhost:3001/getIncidentChartData", {
            "headers": {
                "accept": "application/json",
            },
            "method": "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setChartData(data);
        });

        fetch("http://localhost:3001/getRoster", {
            "headers": {
                "accept": "application/json",
            },
            "method": "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setRoster(data);
        });

        fetch("http://localhost:3001/getInternalIncidents", {
            "headers": {
                "accept": "application/json",
            },
            "method": "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setFeed(data);
        });
    }, [])

    return (
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                                        <button className="DesktopTableUtil" onClick={() => setOpen(true)}>Add Member</button>
                                        <button className="DesktopTableUtil" style={{marginLeft: '10px'}}>Remove</button>
                                    </div>
                                    <div style={{ height: 400, maxWidth: '500px' }}>
                                        <DataGrid
                                            rows={roster}
                                            columns={columns}
                                            checkboxSelection
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
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
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
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
                                                            {row.time}
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

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <TextField id="outlined-search" label="📞 Number" type="text" onChange={(e: any) => setPhone(e.target.value)} value={phone} />
                    <br />
                    <button className='DesktopNumberAdd' onClick={() => submit()} style={{marginTop: '20px'}}>
                        Submit
                    </button>
                </Box>
            </Modal>
        </div>
    )
}