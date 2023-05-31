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
                            <UserInfoRow fieldName={'Created Date'} fieldValue={formatDateTime(selectedNewsArticle.createdDateTime)}/>
                        </List>
                        <Button id={'trainer-table-back-button'} onClick={() => {
                            handleCloseNewsArticleInfoDialog()
                        }}>Back</Button>
                    </Card>
                </DialogContent>
            </Dialog>));
}

export default AdminNewsArticleInfoDialog;