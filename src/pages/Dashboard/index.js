import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useWindowDimensions } from "../../utility/dimensions";
import './style.css';
import { useNavigate } from "react-router-dom";
import GSTBack from '../../assets/gst.jpg';
import AppointmentCardForEmployee from "../../components/AppointmentCardForEmployee";
import axiosInstance from "../../utility/axios";
import { sortAppointment } from "../../utility/sortAppointment";
const Dashboard = (props) => {

    const { height, width } = useWindowDimensions();
    const [loader, setLoader] = React.useState(false);
    const [appointments, setAppointments] = React.useState();
    const [requests, setRequests] = React.useState();
    const [updateAll, setUpdateAll] = React.useState(0);

    React.useEffect(() => {
        axiosInstance.get(`/get-appointment-emp`).then(res => {
            console.log(res.data);
            setAppointments(sortAppointment(res.data));
        }).catch(err => {
            console.log(err);
        });
    }, [updateAll]);
    React.useEffect(() => {
        axiosInstance.get(`/get-request-emp`).then(res => {
            console.log(res.data);
            setRequests(sortAppointment(res.data));
        }).catch(err => {
            console.log(err);
        });
    }, [updateAll]);

    const acceptClick = (appointment) => {
        setLoader(true);
        axiosInstance.post('/update-status-apt', { id: appointment.id, status: 'accepted' }).then(res => {
            // window.location.reload();
            setLoader(false);
            setUpdateAll(updateAll + 1);
        }).catch(err => {

        });
    }
    const rejectClick = (appointment) => {
        setLoader(true);
        axiosInstance.post('/update-status-apt', { id: appointment.id, status: 'rejected' }).then(res => {
            // window.location.reload();
            setLoader(false);
            setUpdateAll(updateAll + 1);
        }).catch(err => {

        });
    }
    const navigate = useNavigate();
    return (

        <Grid className='dashboard' container alignItems='flex-start' style={{ height: 'auto', paddingTop: '1em', paddingBottom: '2%' }} justifyContent='center'>

            {loader ?
                <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                </div > :

                <Grid item style={{ marginLeft: width > 1079 ? width > 1250 ? '27%' : '38%' : '0px' }} lg={8} md={11} sm={11} xs={11}>
                    {width <= 600 ?
                        <><br /><br /></> : <></>}


                    <Grid container  >
                        <h2>Requests</h2>
                        {requests != undefined ?
                            <Grid container style={{ flexWrap: 'nowrap', overflowX: 'scroll' }}>
                                {requests.length==0?<h2>No requests</h2>:requests.map((appointment, index) => {
                                    return (
                                        <AppointmentCardForEmployee id={index + 1} employee={appointment}
                                            acceptClick={() => acceptClick(appointment)} rejectClick={() => rejectClick(appointment)}

                                        />
                                    )
                                })
                                }


                            </Grid> :
                            <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                                <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                            </div >
                        }

                        <h2>Appointments</h2>
                        {appointments != undefined ?
                            <Grid container style={{ flexWrap: 'nowrap', overflowX: 'scroll' }}>
                                 {appointments.length==0?<h2>No Appointments</h2>:appointments.map((appointment, index) => {
                                    return (
                                        <AppointmentCardForEmployee id={index + 1} employee={appointment}
                                            acceptClick={() => acceptClick(appointment)} rejectClick={() => rejectClick(appointment)}

                                        />
                                    )
                                })
                                }


                            </Grid> :
                            <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }} >
                                <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                            </div >
                        }

                    </Grid>
                </Grid>
            }
        </Grid>

    );
}
export default Dashboard;