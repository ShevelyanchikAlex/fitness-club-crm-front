import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import '../../../assets/styles/Services.css';
import ServiceInfo from "./ServiceInfo";
import ServiceService from "../../../service/ServiceService";
import CircularIndeterminate from "../../common/CircularProgress";
import ReservationServiceDialog from "./ReservationServiceDialog";
import EmptyListCard from "../error/EmptyListCard";

const Services = () => {

    const PAGE_OFFSET = 1;
    const USER_ROLE = 'USER';
    const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
    const [isOpenReserveService, setIsOpenReserveService] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [role, setRole] = useState('GUEST');
    const [servicesCount, setServicesCount] = useState(10);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState({})


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem('user-role'))
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
                setServicesCount(Math.ceil(response.data / size))
            })
            .catch(e => console.log(e));
    }, [size]);


    function ServiceItem(props) {
        return <Grid className={'service-item'} item>
            <Box className={'service-item-header'}>
                <Typography variant="h6">{props.service.name}</Typography>
            </Box>
            <Typography variant="body1" id={'service-item-body'}>
                {props.service.description.length <= 170
                    ? props.service.description
                    : (props.service.description.substr(0, 170) + "...")
                }
            </Typography>
            {
                (role && role === USER_ROLE)
                    ? <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button id={'more-info-button'} onClick={() => {
                                setSelectedService(props.service);
                                setIsOpenMoreInfo(true);
                            }}>More Info</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button id={'reserve-button'} onClick={() => {
                                setSelectedService(props.service);
                                setIsOpenReserveService(true);
                            }}>Reserve</Button>
                        </Grid>
                    </Grid>
                    : <Button id={'more-info-button'} onClick={() => {
                        setSelectedService(props.service);
                        setIsOpenMoreInfo(true);
                    }}>More Info</Button>
            }
        </Grid>
    }


    function ServiceBox() {
        return <Box className={'service-box'}>
            <Typography variant="h3" id={'service-box-header'}>
                Our Services
            </Typography>
            <Typography variant="h6" id={'service-box-subheader'}>
                Visitors of Fitness Club will enjoy a wide range of services, including individual
                and group workouts with expert trainers.
            </Typography>
            <Grid container id={'service-items-container'}>
                {services.map((service) => (<ServiceItem
                    key={service.id}
                    service={service}
                />))}
            </Grid>
            <ServiceInfo
                isOpenMoreInfo={isOpenMoreInfo}
                setIsOpenMoreInfo={setIsOpenMoreInfo}
                serviceDto={selectedService}
            />
            <ReservationServiceDialog
                isOpenReserveService={isOpenReserveService}
                setIsOpenReserveService={setIsOpenReserveService}
                service={selectedService}
            />
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
            :
            (services.length === 0
                ? <EmptyListCard/>
                : <Box marginTop={'5%'}>
                    <ServiceBox/>
                    <PaginationElement count={servicesCount} page={page + PAGE_OFFSET} setPage={setPage}/>
                </Box>)
    )
};

export default Services;