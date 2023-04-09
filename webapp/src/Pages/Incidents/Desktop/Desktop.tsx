import './Desktop.css';
import { Box, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { Item } from '../../../Components/item';

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

export default function Desktop() {
    const [chartData, setChartData] = React.useState([{name: 'Week 1', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 2', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 3', uv: 0, pv: 2400, amt: 2400}, {name: 'Week 4', uv: 0, pv: 2400, amt: 2400}])

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
    })
    return (
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <Card sx={{minWidth: 500, minHeight: 700, maxHeight: 700  }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                        Incident Map
                                    </Typography>
                                    <div>
                                        <iframe title="heatmap" src="./Heatmap/index.html" width="100%" height="500px"></iframe>
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
                                        <Table sx={{ maxWidth: 700 }} aria-label="simple table">
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