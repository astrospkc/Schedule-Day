import { DatePicker, TimePicker } from '@mui/x-date-pickers'


const Dashboard = () => {
    return (
        <div>
            <DatePicker className='bg-white' />
            <TimePicker label="Basic time picker" className='bg-white' />

        </div>
    )
}

export default Dashboard
