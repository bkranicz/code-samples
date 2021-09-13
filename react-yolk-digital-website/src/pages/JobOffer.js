import Job from '../components/Job'
import Apply from '../components/CareerApply'
import { useParams } from 'react-router-dom'

function JobOffer() {
    // retrieve params into a variable
    const params = useParams();

    return (
        <>
            <Job id={params.id}/>
            <Apply />
        </>
    )
}

export default JobOffer;