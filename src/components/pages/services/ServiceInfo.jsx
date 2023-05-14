import React, {useState} from 'react';
import '../../../assets/styles/UserEdit.css';
import {
    Card,
    Dialog, DialogContent, List,
} from "@mui/material";
import '../../../assets/styles/Services.css';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ServiceInfo = ({isOpenMoreInfo, setIsOpenMoreInfo, serviceDto}) => {

    function ServiceInfoRow({fieldName, fieldValue}) {
        return <Box className={'service-info-card-row'}>
            <Typography variant="h5"
                        id={'service-info-card-field-name'}>{fieldName}</Typography>
            <Typography
                id={'service-info-card-field-value'}>{fieldValue}</Typography>
        </Box>;
    }


    return (
        <Dialog open={isOpenMoreInfo}
                PaperProps={{
                    style: {backgroundColor: 'transparent', boxShadow: 'none'}
                }}
                sx={{backgroundColor: 'transparent'}}
        >
            <DialogContent>
                <Card id={'service-info-card'}>
                    <h1 className={"service-info-card-header"}>Service Description</h1>
                    <List style={{height: 300, overflow: 'auto'}}>
                        <ServiceInfoRow fieldName={'Name'} fieldValue={serviceDto.name}/>
                        <ServiceInfoRow fieldName={'Description'} fieldValue={serviceDto.description}/>
                        <ServiceInfoRow fieldName={'Price'} fieldValue={serviceDto.price + ' $'}/>
                    </List>
                    <Button id={'services-back-button'} onClick={() => setIsOpenMoreInfo(false)}>Back</Button>
                </Card>
            </DialogContent>
        </Dialog>);
}

export default ServiceInfo;