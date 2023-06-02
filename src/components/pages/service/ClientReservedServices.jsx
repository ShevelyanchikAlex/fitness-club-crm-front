import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import '../../../assets/styles/ReservedServices.css';
import CircularIndeterminate from "../../common/CircularProgress";
import OrderService from "../../../service/OrderService";
import UserService from "../../../service/UserService";
import Forbidden from "../error/Forbidden";
import EmptyListCard from "../error/EmptyListCard";
import DateTimeUtilService from "../../../service/DateTimeUtilService";

const ClientReservedServices = () => {

    const PAGE_OFFSET = 1;
    const USER_ROLE = 'USER';
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [role, setRole] = useState('GUEST');
    const [reservedServicesCount, setReservedServicesCount] = useState(10);
    const [reservedServices, setReservedServices] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem('user-role'))
        const email = localStorage.getItem("user-email");

        UserService.getUserByEmail(email)
            .then(response => {
                const userId = response.data.id
                OrderService.getAllOrdersByUserId(page, size, userId)
                    .then(response => {
                        setReservedServices(response.data);

                        OrderService.getOrdersCountByUserId(userId)
                            .then(response => {
                                setReservedServicesCount(Math.ceil(response.data / size));
                            })
                            .catch((error) => console.log(error));
                        setIsLoading(false);
                    })
                    .catch(() => setIsLoading(false));
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);


    function ReservedServiceFieldRow(props) {
        return <Grid container spacing={2} id={'reserved-service-card-field-row'}>
            <Grid item id={'reserved-service-card-field-row-item'}>
                <Typography variant="h6" fontWeight={'bold'}>{props.fieldName}</Typography>
            </Grid>
            <Grid item id={'reserved-service-card-field-row-item'}>
                <Typography variant="h6">
                    {props.fieldValue.length <= 60
                        ? props.fieldValue
                        : (props.fieldValue.substr(0, 60) + "...")
                    }
                </Typography>
            </Grid>
        </Grid>
    }

    function ReservedServiceItem(props) {
        return <Grid className={'reserved-service-item'} item>
            <Box className={'reserved-service-item-header'}>
                <Typography variant="h5" fontWeight={'bold'}>{props.service.serviceDto.name}</Typography>
            </Box>
            <ReservedServiceFieldRow fieldName={'Reserving date:'}
                                     fieldValue={DateTimeUtilService.formatDateTime(props.service.createdDateTime)}
            />
            <ReservedServiceFieldRow fieldName={'Training date:'}
                                     fieldValue={DateTimeUtilService.formatDateTime(props.service.trainingStartDateTime)}
            />
            <ReservedServiceFieldRow fieldName={'Service price:'} fieldValue={props.service.serviceDto.price + ' $'}/>
            <ReservedServiceFieldRow fieldName={'Service status:'} fieldValue={props.service.orderStatus}/>
        </Grid>
    }


    function ReservedServiceBox() {
        return <Box className={'reserved-service-box'}>
            <Typography variant="h3" id={'reserved-service-box-header'}>
                Reserved services
            </Typography>
            <Grid container id={'reserved-service-items-container'}>
                {reservedServices.map((service) => (<ReservedServiceItem
                    key={service.id}
                    service={service}
                />))}
            </Grid>
        </Box>
    }

    function PaginationElement(props) {
        return <Pagination
            sx={{marginBottom: 10, justifyContent: 'center', display: 'flex'}}
            count={props.count}
            variant="outlined"
            color="primary"
            page={props.page}
            onChange={(_, page) => {
                if (page !== null) props.setPage(page - PAGE_OFFSET);
            }}
        />;
    }

    return (
        isLoading
            ? <CircularIndeterminate/>
            : ((role && role === USER_ROLE)
                ? (reservedServices.length === 0
                        ? <EmptyListCard/>
                        : <Box marginTop={'5%'}>
                            <ReservedServiceBox/>
                            <PaginationElement count={reservedServicesCount} page={page + PAGE_OFFSET} setPage={setPage}/>
                        </Box>
                )
                : <Forbidden/>)
    )
};

export default ClientReservedServices;