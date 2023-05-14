import React, {useEffect, useState} from 'react';
import UserService from "../../../service/UserService";
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
import Forbidden from "../error/Forbidden";

const UsersTable = () => {

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfUsers, setCountOfUsers] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        UserService.getAllUsers(page, size)
            .then(response => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        UserService.getUsersCount()
            .then(response => {
                setCountOfUsers(response.data)
            })
            .catch((error) => console.log(error));
    }, [page, size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((role && role === ADMIN_ROLE)
            ? ((users.length === 0) ? <EmptyListCard/> :
                    <div>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Surname</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Phone Number</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Change Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="right">{user.name}</TableCell>
                                            <TableCell align="right">{user.surname}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.phoneNumber}</TableCell>
                                            <TableCell align="right">{user.role}</TableCell>
                                            <TableCell align="right">{user.status}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() => {
                                                    }}
                                                    variant='contained'
                                                    sx={{background: '#2196f3', color: 'white', textTransform: 'none'}}
                                                >
                                                    Edit Status
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
                            count={countOfUsers}
                            rowsPerPage={size}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeSize}
                        />
                    </div>
            )
            : <Forbidden/>));
}

export default UsersTable;