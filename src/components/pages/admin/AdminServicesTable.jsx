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
import Forbidden from "../error/Forbidden";
import ScheduleService from "../../../service/ScheduleService";

const AdminServicesTable = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfServices, setCountOfServices] = useState(10);
    const rowsPerPage = [5, 10, 20];


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        ServiceService.getAllServices(page, size)
            .then(response => {
                setServices(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);

    useEffect(() => {
        ServiceService.getServicesCount()
            .then(response => {
                setCountOfServices(response.data);
            })
            .catch((error) => console.log(error));
    }, []);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((role && role === ADMIN_ROLE)
            ? ((services.length === 0) ? <EmptyListCard/> :
                    <div>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {services.map(service => (
                                        <TableRow key={service.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {service.id}
                                            </TableCell>
                                            <TableCell align="center">{service.name}</TableCell>
                                            <TableCell align="center">
                                                {service.description.length <= 60
                                                    ? service.description
                                                    : (service.description.substr(0, 60) + "...")
                                                }
                                            </TableCell>
                                            <TableCell align="center">{service.price + ' $'}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        navigate('/admin/services/edit', {
                                                            state: {
                                                                id: service.id,
                                                                description: service.description,
                                                                name: service.name,
                                                                price: service.price,
                                                            },
                                                        });
                                                    }}
                                                    variant='contained'
                                                    sx={{
                                                        background: '#2196f3',
                                                        color: 'white',
                                                        textTransform: 'none'
                                                    }}
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
            )
            : <Forbidden/>));
}

export default AdminServicesTable;