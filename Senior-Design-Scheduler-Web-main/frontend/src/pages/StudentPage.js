import React from 'react';
import LoggedInName from '../components/LoggedInName';
import GroupSchedule from '../components/GroupSchedule';


const StudentPage = () =>
{ 

    return(
        <div>
            <LoggedInName />
            <GroupSchedule />
        </div>
    );
}

export default StudentPage;



