export const sortAppointment = (appointments) => {
    let tmp=[];
    appointments.map(v=>{
        if(v.status==='pending'){
            tmp.push(v);
        }
    });
    appointments.map(v=>{
        if(v.status!=='pending'){
            tmp.push(v);
        }
    });
    return tmp;

}