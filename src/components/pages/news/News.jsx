import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Grid, Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import '../../../assets/styles/News.css';
import CircularIndeterminate from "../../common/CircularProgress";
import EmptyListCard from "../error/EmptyListCard";
import NewsArticleService from "../../../service/NewsArticleService";
import NewsArticleInfoDialog from "./NewsArticleInfoDialog";

const News = () => {

    const PAGE_OFFSET = 1;
    const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [newsArticleCount, setNewsArticlesCount] = useState(10);
    const [newsArticles, setNewsArticles] = useState([]);
    const [selectedNewsArticle, setSelectedNewsArticle] = useState({});


    useEffect(() => {
        setIsLoading(true);
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
                setNewsArticlesCount(Math.ceil(response.data / size));
            })
            .catch(e => console.log(e));
    }, [size]);


    function NewsArticleItem(props) {
        return <Grid className={'news-item'} item>
            <Box className={'news-item-header'}>
                <Typography variant="h6">
                    {props.newsArticle.title.length <= 70
                        ? props.newsArticle.title
                        : (props.newsArticle.title.substr(0, 70) + "...")
                    }
                </Typography>
            </Box>
            <Typography variant="body1" id={'news-item-body'}>
                {props.newsArticle.content && props.newsArticle.content.length <= 200
                    ? props.newsArticle.content
                    : (props.newsArticle.content.substr(0, 200) + "...")
                }
            </Typography>
            <Button id={'more-info-button'} onClick={() => {
                setSelectedNewsArticle(props.newsArticle);
                setIsOpenMoreInfo(true);
            }}>More Info</Button>
        </Grid>
    }


    function NewsBox() {
        return <Box className={'news-box'}>
            <Typography variant="h3" id={'news-box-header'}>
                Our News
            </Typography>
            <Grid container id={'news-items-container'}>
                {newsArticles.map((newsArticle) => (<NewsArticleItem
                    key={newsArticle.id}
                    newsArticle={newsArticle}
                />))}
            </Grid>
            <NewsArticleInfoDialog
                isOpenNewsArticleInfo={isOpenMoreInfo}
                setIsOpenNewsArticleInfo={setIsOpenMoreInfo}
                newsArticleDto={selectedNewsArticle}
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
            (newsArticles.length === 0
                ? <EmptyListCard/>
                : <Box marginTop={'5%'}>
                    <NewsBox/>
                    <PaginationElement count={newsArticleCount} page={page + PAGE_OFFSET} setPage={setPage}/>
                </Box>)
    )
};

export default News;