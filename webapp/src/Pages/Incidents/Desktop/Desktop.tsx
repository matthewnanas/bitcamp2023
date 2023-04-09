import React from 'react';
import './Desktop.css';
import { Box, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { Item } from '../../../Components/item';

export default function Desktop() {
    const [feed, setFeed] = React.useState<any[]>([])

    React.useEffect(() => {
        fetch(`http://localhost:3001/getIncidents`, {
            "method": "GET",
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            console.log(data);
            setFeed(data.incidents);
            console.log(data.incidents.length)
        });
    }, [])

    const timeConverter = (UNIX_timestamp: number) => {
        var a = new Date(UNIX_timestamp / 1000);
        return a.toString();
    }

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