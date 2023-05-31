import React, {useEffect, useState} from 'react';
import {
    Alert,
    CircularProgress, Snackbar,
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
import NewsArticleService from "../../../service/NewsArticleService";
import Box from "@mui/material/Box";
import AdminNewsArticleInfoDialog from "./form/news/AdminNewsArticleInfoDialog";

const AdminNewsApiArticlesTable = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [newsArticles, setNewsArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedNewsArticle, setSelectedNewsArticle] = useState();
    const [isOpenNewsArticleInfoDialog, setIsOpenNewsArticleInfoDialog] = useState(false);
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfNewsArticles, setCountOfNewsArticles] = useState(10);
    const rowsPerPage = [5, 10, 20];


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        NewsArticleService.getNewsFromNewsApi("health", 20, "us")
            .then(response => {
                setNewsArticles(response.data);
                setCountOfNewsArticles(response.data.length);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);


    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    const addNewsArticle = (newsArticleDto) => {
        const handledNewsArticleDto = {
            title: newsArticleDto.title && newsArticleDto.title.length < 100
                ? newsArticleDto.title
                : newsArticleDto.title.substr(0, 100),
            content: newsArticleDto.content,
            author: newsArticleDto.author && newsArticleDto.author.length < 150
                ? newsArticleDto.author
                : newsArticleDto.author.substr(0, 150),
            url: newsArticleDto.url && newsArticleDto.url.length < 300
                ? newsArticleDto.url
                : newsArticleDto.url.substr(0, 300),
            imageUrl: newsArticleDto.imageUrl && newsArticleDto.imageUrl.length < 255
                ? newsArticleDto.imageUrl
                : newsArticleDto.imageUrl.substr(0, 255),
        };

        NewsArticleService.saveNewsArticle(handledNewsArticleDto)
            .then(() => {
                setAlertAction('success', 'News Article successfully created.', 1000)
                sleep(1000).then(() => navigate('/admin/newsArticles'));
            })
            .catch(ex => {
                setAlertAction('error', ex.response.data, 5000)
            })
    }

    function setAlertAction(severityType, text, autoHideDuration) {
        setShowAlert(true)
        setSeverityType(severityType)
        setAlertText(text)
        setAlertAutoHideDuration(autoHideDuration)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function formatDateTime(dateTime) {
        const datetime = new Date(dateTime);

        const formattedDate = datetime.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = datetime.toLocaleTimeString("de-DE", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        });
        return `${formattedDate}  ${formattedTime}`;
    }

    return (isLoading ? <CircularProgress/> :
        ((role && role === ADMIN_ROLE)
            ? ((newsArticles.length === 0) ? <EmptyListCard/> :
                <Box>
                    <TableContainer sx={{marginY: 10}}>
                        <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                                  onClose={() => setShowAlert(false)}>
                            <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                                {alertText}
                            </Alert>
                        </Snackbar>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Author</TableCell>
                                    <TableCell align="center">URL</TableCell>
                                    <TableCell align="center">Created Date</TableCell>
                                    <TableCell align="center">More Info</TableCell>
                                    <TableCell align="center">News Adding</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newsArticles.map(newsArticle => (
                                    <TableRow key={newsArticle.title} hover role="checkbox" tabIndex={-1}>
                                        <TableCell align="center">
                                            {newsArticle.title.length <= 40
                                                ? newsArticle.title
                                                : (newsArticle.title.substr(0, 40) + "...")
                                            }
                                        </TableCell>
                                        <TableCell
                                            align="center">{newsArticle.author ? newsArticle.author : 'Without Author'}</TableCell>
                                        <TableCell align="center">
                                            {newsArticle.url ? (newsArticle.url.length <= 40
                                                ? newsArticle.url
                                                : (newsArticle.url.substr(0, 40) + "...")) : 'none'}
                                        </TableCell>
                                        <TableCell
                                            align="center">{formatDateTime(newsArticle.createdDateTime)}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() => {
                                                    setSelectedNewsArticle(newsArticle);
                                                    setIsOpenNewsArticleInfoDialog(true);
                                                }}
                                                variant='contained'
                                                sx={{
                                                    background: '#2196f3',
                                                    color: 'white',
                                                    textTransform: 'none'
                                                }}
                                            >
                                                Info
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() => addNewsArticle(newsArticle)}
                                                variant='contained'
                                                sx={{
                                                    background: '#51c481',
                                                    color: 'white',
                                                    textTransform: 'none'
                                                }}
                                            >
                                                Add
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
                        count={countOfNewsArticles}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />

                    {selectedNewsArticle &&
                        <Box>
                            <AdminNewsArticleInfoDialog
                                isOpenNewsArticleInfoDialog={isOpenNewsArticleInfoDialog}
                                setIsOpenNewsArticleInfoDialog={setIsOpenNewsArticleInfoDialog}
                                setSelectedNewsArticle={setSelectedNewsArticle}
                                selectedNewsArticle={selectedNewsArticle}
                            />
                        </Box>
                    }
                </Box>)
            : <Forbidden/>));
}

export default AdminNewsApiArticlesTable;