import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';


export default function IndividualTask({ handleOneTask, task }) {
    function handleClick() {
        handleOneTask(task.id);
    }

    var date = new Date();
    const [newDate, setnewDate] = React.useState(new Date(task.dueDate));
    const [daysRemainning, setdaysRemainning] = React.useState("");

    function getDaysRemaining() {
        let difference = newDate.getTime() - date.getTime();
        let dif_Day = Math.round(difference / (1000 * 3600 * 24));
        if (dif_Day > 0) {
            let message = `${dif_Day} days remaining!`
            setdaysRemainning(message);
        }
        else {
            setdaysRemainning("OverDue");
        }
    }

    React.useEffect(() => {
        getDaysRemaining()
    }, [])



    return (
        <div style={{ width: "100%" }}>
            <Card onClick={handleClick} sx={{ minWidth: 300 }} style={styles.CardContainer}>
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom>
                        {task.name}
                    </Typography>
                    <div className='d-flex flex-row justify-content-between'>
                        <small style={{ fontStyle: "italic" }}>{task.type}</small>
                        <small style={{ fontStyle: "italic" }}>{daysRemainning} </small>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

const styles = {
    CardContainer: {
        marginTop: 5,
        marginBottom: 5,
        cursor: "pointer",
    },

}