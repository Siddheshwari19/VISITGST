import { CircularProgress, Grid, TextField } from "@mui/material";
import React from "react";
import { useWindowDimensions } from "../../utility/dimensions";
import './style.css';
import { useNavigate } from "react-router-dom";
import GSTBack from '../../assets/gst.jpg';
import AppointmentCardForEmployee from "../../components/AppointmentCardForEmployee";
import axiosInstance from "../../utility/axios";
import { sortAppointment } from "../../utility/sortAppointment";
const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.phn.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.status.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.date.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.purpose.toLowerCase().match(new RegExp(searchTerm, 'g'))


    })
}

const AllRequests = (props) => {

    const { height, width } = useWindowDimensions();
    const [loader, setLoader] = React.useState(false);

    const navigate = useNavigate();
    const [requests, setRequests] = React.useState();
    const [updateAll, setUpdateAll] = React.useState(0);
    const [stockData1, setStockData1] = React.useState([]);

    const handleOnChange = async (e) => {
        let value = e.target.value;
        if (requests) {
            if (value.length >= 2) {

                let search = await arraySearch(requests, value);
                setRequests(search)

            } else {
                setRequests(stockData1)
            }
        }
    }

    React.useEffect(() => {
        axiosInstance.get(`/get-request-emp`).then(res => {
            console.log(res.data);
            setRequests(sortAppointment(res.data));
            setStockData1(sortAppointment(res.data));
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
                        <Grid container justifyContent={'space-between'}>
                            <h2>Requests</h2>
                            <TextField style={{ float: 'right', margin: '1em', width: "15em" }} color="secondary" variant="outlined" type="text" name="search" id="search" placeholder="Search request" onChange={handleOnChange} />

                        </Grid>
                        {requests != undefined ? <Grid container >
                            {requests.length==0?<h1>No requests found</h1>:requests.map((appointment, index) => {
                                return (
                                    <AppointmentCardForEmployee id={index + 1} 
                                    acceptClick={()=>acceptClick(appointment)} rejectClick={()=>rejectClick(appointment)}
                                     employee={appointment} />
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
export default AllRequests;