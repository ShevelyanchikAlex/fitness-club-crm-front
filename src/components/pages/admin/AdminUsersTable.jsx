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
import AdminUserStatusEditForm from "./form/AdminUserStatusEditForm";
import OrderService from "../../../service/OrderService";

const AdminUsersTable = () => {

    const ADMIN_ROLE = 'ADMIN';
    const USER_ROLE = 'USER';
    const [role, setRole] = useState();
    const [users, setUsers] = useState([]);
    const [selectedUserDto, setSelectedUserDto] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenChangeUserStatusDialog, setIsOpenChangeUserStatusDialog] = useState(false);
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
                const usersWithUserRole = response.data.filter(user => user.role == USER_ROLE)
                setUsers(usersWithUserRole);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));

    }, [page, size]);


    useEffect(() => {
        UserService.getUsersCount()
            .then(response => {
                setCountOfUsers(response.data);
            })
            .catch((error) => console.log(error));
    }, [size]);


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
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Surname</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Phone Number</TableCell>
                                        <TableCell align="center">Role</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Change Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="center">{user.name}</TableCell>
                                            <TableCell align="center">{user.surname}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">{user.phoneNumber}</TableCell>
                                            <TableCell align="center">{user.role}</TableCell>
                                            <TableCell align="center">{user.status}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        setSelectedUserDto(user);
                                                        setIsOpenChangeUserStatusDialog(true);
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
                        <AdminUserStatusEditForm
                            isOpenChangeUserStatusDialog={isOpenChangeUserStatusDialog}
                            setIsOpenChangeUserStatusDialog={setIsOpenChangeUserStatusDialog}
                            setSelectedUserDto={setSelectedUserDto}
                            userDto={selectedUserDto}
                        />
                    </div>
            )
            : <Forbidden/>));
}

export default AdminUsersTable;