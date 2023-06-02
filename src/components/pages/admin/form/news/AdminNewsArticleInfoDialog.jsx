import React from 'react';
import '../../../../../assets/styles/UserEdit.css';
import {
    Card,
    Dialog, DialogContent, List,
} from "@mui/material";
import '../../../../../assets/styles/Trainer.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DateTimeUtilService from "../../../../../service/DateTimeUtilService";

const AdminNewsArticleInfoDialog = ({
                                        isOpenNewsArticleInfoDialog,
                                        setIsOpenNewsArticleInfoDialog,
                                        setSelectedNewsArticle,
                                        selectedNewsArticle
                                    }) => {

    const handleCloseNewsArticleInfoDialog = () => {
        setIsOpenNewsArticleInfoDialog(false);
        setSelectedNewsArticle(null);
    }


    function UserInfoRow({fieldName, fieldValue}) {
        return <Box className={'trainer-table-card-row'}>
            <Typography variant="h5"
                        id={'trainer-table-card-field-name'}>{fieldName}</Typography>
            <Typography
                id={'trainer-table-info-card-field-value'}>{fieldValue}</Typography>
        </Box>;
    }

    return (
        ((isOpenNewsArticleInfoDialog && selectedNewsArticle)
            && <Dialog open={isOpenNewsArticleInfoDialog}
                       PaperProps={{
                           style: {
                               backgroundColor: 'transparent',
                               boxShadow: 'none'
                           }
                       }}
                       sx={{backgroundColor: 'transparent'}}>
                <DialogContent>
                    <Card id={'trainer-table-card'}>
                        <h1 className={"trainer-table-card-header"}>News Article</h1>
                        <List style={{height: 300, overflow: 'auto'}}>
                            <UserInfoRow fieldName={'Title'} fieldValue={selectedNewsArticle.title}/>
                            <UserInfoRow fieldName={'Author'} fieldValue={selectedNewsArticle.author}/>
                            <UserInfoRow fieldName={'URL'} fieldValue={selectedNewsArticle.url}/>
                            <UserInfoRow fieldName={'Created Date'}
                                         fieldValue={DateTimeUtilService.formatDateTime(selectedNewsArticle.createdDateTime)}
                            />
                        </List>
                        <Button id={'trainer-table-back-button'} onClick={() => {
                            handleCloseNewsArticleInfoDialog()
                        }}>Back</Button>
                    </Card>
                </DialogContent>
            </Dialog>));
}

export default AdminNewsArticleInfoDialog;