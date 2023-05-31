import React from 'react';
import '../../../assets/styles/UserEdit.css';
import {
    Card,
    Dialog, DialogContent, Link, List,
} from "@mui/material";
import '../../../assets/styles/Services.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NewsArticleInfoDialog = ({isOpenNewsArticleInfo, setIsOpenNewsArticleInfo, newsArticleDto}) => {

    const TEXT_TYPE = 'text';
    const LINK_TYPE = 'link';
    const IMAGE_TYPE = 'image';

    function NewsArticleTextRow({fieldName, fieldValue, fieldType}) {
        return <Box className={'service-info-card-row'}>
            <Typography variant="h5"
                        id={'service-info-card-field-name'}>{fieldName}</Typography>
            {getContainerByContentType(fieldType, fieldValue)}
        </Box>;
    }

    function getContainerByContentType(contentType, content) {
        switch (contentType) {
            case TEXT_TYPE:
                return NewsArticleTextContent(content);
            case LINK_TYPE:
                return NewsArticleLinkContent(content);
            case IMAGE_TYPE:
                return NewsArticleImageContent(content);
            default:
                return NewsArticleTextContent(content);
        }
    }

    function NewsArticleTextContent(content) {
        return <Typography
            id={'service-info-card-field-value'}>{content}</Typography>;
    }

    function NewsArticleLinkContent(content) {
        return <Link href={newsArticleDto.url} textAlign={'center'} margin={2}>{content}</Link>;
    }

    function NewsArticleImageContent(content) {
        return <img src={content} width="100%" height="30%" alt={'image'}/>;
    }


    return (
        <Dialog open={isOpenNewsArticleInfo}
                PaperProps={{
                    style: {backgroundColor: 'transparent', boxShadow: 'none'}
                }}
                sx={{backgroundColor: 'transparent'}}
        >
            <DialogContent>
                <Card id={'service-info-card'}>
                    <h1 className={"service-info-card-header"}>News Article</h1>
                    <List style={{height: 300, overflow: 'auto'}}>
                        {newsArticleDto.title &&
                            <NewsArticleTextRow fieldName={'Title'} fieldValue={newsArticleDto.title}
                                                fieldType={TEXT_TYPE}/>
                        }
                        {newsArticleDto.author &&
                            <NewsArticleTextRow fieldName={'Author'} fieldValue={newsArticleDto.author}
                                                fieldType={TEXT_TYPE}/>
                        }
                        {newsArticleDto.content &&
                            <NewsArticleTextRow fieldName={'Content'} fieldValue={newsArticleDto.content}
                                                fieldType={TEXT_TYPE}/>
                        }
                        {newsArticleDto.url &&
                            <NewsArticleTextRow fieldName={'Link'} fieldValue={newsArticleDto.url}
                                                fieldType={LINK_TYPE}/>
                        }
                        {newsArticleDto.imageUrl &&
                            <NewsArticleTextRow fieldName={'Image'} fieldValue={newsArticleDto.imageUrl}
                                                fieldType={IMAGE_TYPE}/>
                        }
                    </List>
                    <Button id={'services-back-button'} onClick={() => setIsOpenNewsArticleInfo(false)}>Back</Button>
                </Card>
            </DialogContent>
        </Dialog>);
}

export default NewsArticleInfoDialog;