import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EmptyListCard from "../error/EmptyListCard";
import Button from "@mui/material/Button";
import ServiceService from "../../../service/ServiceService";

const ServicesTable = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfServices, setCountOfServices] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        ServiceService.getAllServices(page, size)
            .then(response => {
                setServices(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        ServiceService.getServicesCount()
            .then(response => {
                setCountOfServices(response.data)
            })
            .catch((error) => console.log(error));
    }, [page, size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((services.length === 0) ? <EmptyListCard/> :
                <div>
                    <TableContainer sx={{marginY: 10}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {services.map(service => (
                                    <TableRow key={service.id} hover role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row">
                                            {service.id}
                                        </TableCell>
                                        <TableCell align="right">{service.name}</TableCell>
                                        <TableCell align="right">
                                            {service.description.length <= 60
                                                ? service.description
                                                : (service.description.substr(0, 60) + "...")
                                            }
                                        </TableCell>
                                        <TableCell align="right">{service.price + ' $'}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() => {
                                                }}
                                                variant='contained'
                                                sx={{background: '#2196f3', color: 'white', textTransform: 'none'}}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{display: "flex", justifyContent: "center", marginBottom: 10}}
                        rowsPerPageOptions={rowsPerPage}
                        component="div"
                        count={countOfServices}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </div>
        ));
}

export default ServicesTable;