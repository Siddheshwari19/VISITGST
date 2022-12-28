import { Button, Grid } from "@mui/material";
import React from "react";
import './style.css';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const AppointmentCardForClient = (props) => {
    const navigate = useNavigate();
    return (
        <Grid className='cardParent' container item lg={4} md={4} sm={6} xs={12} >

            <Grid className='card' container direction='column'>

                <h4 style={{ margin: '0' }} >#{props.employee.id}</h4>
                <h3 style={{ margin: '0' }} class="mb-0 mt-0">{props.employee.name}</h3>

                <Grid container justifyContent={'flex-start'} direction='row'>
                    <span style={{ minHeight: '5em' }} class="articles">{props.employee.purpose}</span>
                </Grid>
                <span>{new Date().toString()}</span>
                <span style={{ fontWeight: '500' }}>Status :<span style={{ color: props.employee.status == 'accepted' ? 'green' : 'red' }}> {props.employee.status}</span></span>

            </Grid>
        </Grid>

    );
}
export default AppointmentCardForClient;