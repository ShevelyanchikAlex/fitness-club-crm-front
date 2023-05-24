import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import '../../../assets/styles/Schedule.css';
import CircularIndeterminate from "../../common/CircularProgress";
import EmptyListCard from "../error/EmptyListCard";
import Forbidden from "../error/Forbidden";
import ScheduleService from "../../../service/ScheduleService";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ScheduleInfoDialog from "./ServiceInfoDialog";
import ReservationServiceDialog from "./ReservationServiceDialog";

const Schedule = () => {
    const navigate = useNavigate();

    const PAGE_OFFSET = 1;
    const USER_ROLE = 'USER';
    const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
    const [isOpenReserveService, setIsOpenReserveService] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [role, setRole] = useState('GUEST');
    const [schedulesCount, setSchedulesCount] = useState(10);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState({})


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem('user-role'))
        ScheduleService.getAllSchedules(page, size)
            .then(response => {
                setSchedules(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);

    useEffect(() => {
        ScheduleService.getSchedulesCount()
            .then(response => {
                setSchedulesCount(Math.ceil(response.data / size))
            })
            .catch(e => console.log(e));
    }, [size]);


    function formatDateTime(dateTime) {
        const datetime = new Date(dateTime);

        const formattedDate = datetime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = datetime.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${formattedDate}-${formattedTime}`;
    }

    function ScheduleDescriptionRow(props) {
        return <Grid container spacing={2} id={'schedule-card-field-row'}>
            <Grid item id={'schedule-card-field-row-item'}>
                <Typography variant="h6" fontWeight={'bold'}>{props.fieldName}</Typography>
            </Grid>
            <Grid item id={'schedule-card-field-row-item'}>
                <Typography variant="h6">{props.fieldValue}</Typography>
            </Grid>
        </Grid>
    }


    function ScheduleItem(props) {
        return <Grid id={'schedule-item'} item>
            <Box className={'schedule-item-header'}>
                <Typography variant="h5" fontWeight={'bold'}>{props.schedule.serviceDto.name}</Typography>
            </Box>
            <ScheduleDescriptionRow fieldName={'Training Type'} fieldValue={props.schedule.serviceType}/>
            <ScheduleDescriptionRow fieldName={'Available Spots'} fieldValue={props.schedule.availableSpots}/>
            <ScheduleDescriptionRow fieldName={'Training Date'}
                                    fieldValue={formatDateTime(props.schedule.trainingStartDateTime)}/>

            {(Date.parse(props.schedule.trainingStartDateTime) - Date.parse(new Date()) > 0 && props.schedule.availableSpots > 0)
                ? <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button id={'schedule-more-info-button'} onClick={() => {
                            setSelectedSchedule(props.schedule);
                            setIsOpenMoreInfo(true);
                        }}>More Info</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button id={'schedule-reserve-button'} onClick={() => {
                            setSelectedSchedule(props.schedule);
                            setIsOpenReserveService(true);
                        }}>Reserve</Button>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Button id={'single-schedule-more-info-button'} onClick={() => {
                            setSelectedSchedule(props.schedule);
                            setIsOpenMoreInfo(true);
                        }}>More Info</Button>
                    </Grid>
                </Grid>
            }
        </Grid>
    }


    function ScheduleBox() {
        return <Box className={'schedule-box'}>
            <Typography variant="h3" id={'schedule-box-header'}>
                Our Schedule
            </Typography>
            <Typography variant="h6" id={'schedule-box-subheader'}>
                We understand that everyone has different commitments, so we've designed our schedule to provide maximum
                flexibility, allowing you to prioritize your health and fitness at your convenience.
            </Typography>
            <Grid container id={'schedule-items-container'}>
                {schedules.map((schedule) => (<ScheduleItem
                    key={schedule.id}
                    schedule={schedule}
                />))}
            </Grid>
            <ScheduleInfoDialog
                isOpenMoreInfo={isOpenMoreInfo}
                setIsOpenMoreInfo={setIsOpenMoreInfo}
                scheduleDto={selectedSchedule}
            />
            <ReservationServiceDialog
                isOpenReserveService={isOpenReserveService}
                setIsOpenReserveService={setIsOpenReserveService}
                scheduleDto={selectedSchedule}
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
            : (role === USER_ROLE
                ? (schedules.length === 0
                    ? <EmptyListCard/>
                    : <Box marginTop={'5%'}>
                        <ScheduleBox/>
                        <PaginationElement count={schedulesCount} page={page + PAGE_OFFSET} setPage={setPage}/>
                    </Box>)
                : <Forbidden/>)

    )
};

export default Schedule;