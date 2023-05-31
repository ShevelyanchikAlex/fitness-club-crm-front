import React, {useState} from 'react';
import '../../../../../assets/styles/UserEdit.css';
import {
    Alert,
    Card,
    Dialog, DialogContent, Grid, Snackbar,
} from "@mui/material";
import '../../../../../assets/styles/Trainer.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NewsArticleService from "../../../../../service/NewsArticleService";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const AdminNewsArticleDeleteDialog = ({
                                          isOpenNewsArticleDeleteDialog,
                                          setIsOpenNewsArticleDeleteDialog,
                                          selectedNewsArticleId,
                                          selectedNewsArticleTitle
                                      }) => {
    const navigate = useNavigate();

    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');

    const handleCloseNewsArticleDeleteDialog = () => {
        setIsOpenNewsArticleDeleteDialog(false);
    }

    const handleDelete = () => {
        NewsArticleService.deleteNewsArticleById(selectedNewsArticleId)
            .then(() => {
                setAlertAction('success', 'News Article successfully deleted.', 1000)
                sleep(1000).then(() => {
                    window.location.reload();
                    navigate('/admin/newsArticles');
                    setIsOpenNewsArticleDeleteDialog(false);
                })
            })
            .catch(ex => {
                const errorMessage = ex.response && ex.response.data && ex.response.data.message;
                setAlertAction('error', errorMessage || 'An error occurred', 5000)
            });
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


    return (
        ((isOpenNewsArticleDeleteDialog && selectedNewsArticleId && selectedNewsArticleTitle)
            &&
            <Box>
                <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                          onClose={() => setShowAlert(false)}>
                    <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                        {alertText}
                    </Alert>
                </Snackbar>
                <Dialog open={isOpenNewsArticleDeleteDialog}
                        PaperProps={{
                            style: {
                                backgroundColor: 'transparent',
                                boxShadow: 'none'
                            }
                        }}
                        sx={{backgroundColor: 'transparent'}}>
                    <DialogContent>
                        <Card id={'trainer-table-card'}>
                            <h1 className={"trainer-table-card-header"}>Delete Confirmation</h1>
                            <Typography margin={2}>Are you sure you want to delete the news article:
                                {selectedNewsArticleTitle} ?</Typography>
                            <Grid container className={"button-grid"}>
                                <Grid xs={6}>
                                    <Button
                                        className={"back-button"}
                                        variant='outlined'
                                        sx={{textTransform: 'none'}}
                                        onClick={() => handleCloseNewsArticleDeleteDialog()}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid xs={6}>
                                    <Button
                                        className={"submit-button"}
                                        variant='contained'
                                        onClick={() => handleDelete()}
                                        type="submit"
                                        sx={{textTransform: 'none', background: '#f64646'}}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </DialogContent>
                </Dialog>
            </Box>));
}

export default AdminNewsArticleDeleteDialog;