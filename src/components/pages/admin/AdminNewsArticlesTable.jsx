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
import Forbidden from "../error/Forbidden";
import NewsArticleService from "../../../service/NewsArticleService";
import Box from "@mui/material/Box";
import AdminNewsArticleInfoDialog from "./form/news/AdminNewsArticleInfoDialog";
import AdminNewsArticleDeleteDialog from "./form/news/AdminNewsArticleDeleteDialog";
import DateTimeUtilService from "../../../service/DateTimeUtilService";

const AdminNewsArticlesTable = () => {
    const navigate = useNavigate();

    const ADMIN_ROLE = 'ADMIN';
    const [role, setRole] = useState();
    const [newsArticles, setNewsArticles] = useState([]);
    const [selectedNewsArticle, setSelectedNewsArticle] = useState();
    const [isOpenNewsArticleInfoDialog, setIsOpenNewsArticleInfoDialog] = useState(false);
    const [isOpenNewsArticleDeleteDialog, setIsOpenNewsArticleDeleteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfNewsArticles, setCountOfNewsArticles] = useState(10);
    const rowsPerPage = [5, 10, 20];


    useEffect(() => {
        setIsLoading(true);
        setRole(localStorage.getItem("user-role"));
        NewsArticleService.getAllNewsArticles(page, size)
            .then(response => {
                setNewsArticles(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);

    useEffect(() => {
        NewsArticleService.getNewsArticlesCount()
            .then(response => {
                setCountOfNewsArticles(response.data);
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
            ? ((newsArticles.length === 0) ? <EmptyListCard/> :
                    <Box>
                        <TableContainer sx={{marginY: 10}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Author</TableCell>
                                        <TableCell align="center">URL</TableCell>
                                        <TableCell align="center">Created Date</TableCell>
                                        <TableCell align="center">More Info</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {newsArticles.map(newsArticle => (
                                        <TableRow key={newsArticle.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell component="th" scope="row">
                                                {newsArticle.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {newsArticle.title.length <= 60
                                                    ? newsArticle.title
                                                    : (newsArticle.title.substr(0, 60) + "...")
                                                }
                                            </TableCell>
                                            <TableCell align="center">{newsArticle.author}</TableCell>
                                            <TableCell
                                                align="center"> {newsArticle.url ? (newsArticle.url.length <= 40
                                                ? newsArticle.url
                                                : (newsArticle.url.substr(0, 40) + "...")) : 'none'}</TableCell>
                                            <TableCell align="center">
                                                {DateTimeUtilService.formatDateTime(newsArticle.createdDateTime)}
                                            </TableCell>
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
                                                    onClick={() => {
                                                        navigate('/admin/news/update', {
                                                            state: {
                                                                id: newsArticle.id,
                                                                title: newsArticle.title,
                                                                content: newsArticle.content,
                                                                author: newsArticle.author,
                                                                url: newsArticle.url,
                                                                imageUrl: newsArticle.imageUrl,
                                                                createdDateTime: newsArticle.createdDateTime,
                                                            },
                                                        });
                                                    }}
                                                    variant='contained'
                                                    sx={{
                                                        background: '#f39629',
                                                        color: 'white',
                                                        textTransform: 'none'
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => {
                                                        setSelectedNewsArticle(newsArticle);
                                                        setIsOpenNewsArticleDeleteDialog(true);
                                                    }}
                                                    variant='contained'
                                                    sx={{
                                                        background: '#f64646',
                                                        color: 'white',
                                                        textTransform: 'none'
                                                    }}
                                                >
                                                    Delete
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
                                <AdminNewsArticleDeleteDialog
                                    isOpenNewsArticleDeleteDialog={isOpenNewsArticleDeleteDialog}
                                    setIsOpenNewsArticleDeleteDialog={setIsOpenNewsArticleDeleteDialog}
                                    selectedNewsArticleId={selectedNewsArticle.id}
                                    selectedNewsArticleTitle={selectedNewsArticle.title}
                                />
                            </Box>
                        }
                    </Box>
            )
            : <Forbidden/>));
}

export default AdminNewsArticlesTable;