import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import '../../../../../assets/styles/FormCard.css';
import {
    Alert,
    Card,
    Container,
    Grid,
    List,
    Snackbar,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Forbidden from "../../../error/Forbidden";
import NewsArticleService from "../../../../../service/NewsArticleService";

const AdminNewsArticleEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const ADMIN_ROLE = 'ADMIN';
    const role = localStorage.getItem('user-role');
    const [alertAutoHideDuration, setAlertAutoHideDuration] = useState(5000);
    const [showAlert, setShowAlert] = useState(false);
    const [severityType, setSeverityType] = useState('error');
    const [alertText, setAlertText] = useState('');
    const [newsArticleDtoInitialValue] = useState({
        id: location.state.id,
        title: location.state.title,
        content: location.state.content,
        author: location.state.author,
        url: location.state.url,
        imageUrl: location.state.imageUrl,
        createdDateTime: location.state.createdDateTime,
    });


    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is a required field'),
        content: yup.string().required('Content is a required field'),
        author: yup.string().required("Author is a required field").min(1).max(30),
        url: yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Invalid URL'),
        imageUrl: yup.string().matches('^(https?:\\/\\/.*\\.(?:png|jpg))$', 'Invalid image url'),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: newsArticleDtoInitialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            handleSubmit();
        },
    });

    const handleSubmit = () => {
        const handledNewsArticleDto = {
            id: formik.values.id,
            title: formik.values.title,
            content: formik.values.content,
            author: formik.values.author,
            url: formik.values.url,
            imageUrl: formik.values.imageUrl,
        };

        console.log(handledNewsArticleDto)

        NewsArticleService.updateNewsArticle(handledNewsArticleDto)
            .then(() => {
                setAlertAction('success', 'News Article successfully updated.', 1000)
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

    return ((role && (role === ADMIN_ROLE))
        ? <Container>
            <Snackbar open={showAlert} autoHideDuration={alertAutoHideDuration}
                      onClose={() => setShowAlert(false)}>
                <Alert severity={severityType} onClose={() => setShowAlert(false)}>
                    {alertText}
                </Alert>
            </Snackbar>
            <Card id={"card"}>
                <h1 className={"header"}>News Article Creation</h1>
                <form onSubmit={formik.handleSubmit}>
                    <List style={{height: 300, overflow: 'auto'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Title"
                            name={"title"}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={!!formik.errors.title}
                            helperText={formik.errors.title}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Content"
                            name={"content"}
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            error={!!formik.errors.content}
                            helperText={formik.errors.content}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Author"
                            name={"author"}
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            error={!!formik.errors.author}
                            helperText={formik.errors.author}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="URL"
                            name={"url"}
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={!!formik.errors.url}
                            helperText={formik.errors.url}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Image URL"
                            name={"imageUrl"}
                            value={formik.values.imageUrl}
                            onChange={formik.handleChange}
                            error={!!formik.errors.imageUrl}
                            helperText={formik.errors.imageUrl}
                        />
                    </List>
                    <Grid container className={"button-grid"}>
                        <Grid item xs={6}>
                            <Button
                                className={"back-button"}
                                variant='outlined'
                                sx={{textTransform: 'none'}}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                className={"submit-button"}
                                variant='contained'
                                type="submit"
                                sx={{textTransform: 'none'}}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
        : <Forbidden/>);
}

export default AdminNewsArticleEditForm;