const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { reset } = require('nodemon');
const { ObjectId, MongoAPIError } = require('mongodb');
const { time } = require('console');
const { get } = require('http');
const { triggerAsyncId } = require('async_hooks');
exports.setApp = function (app, client) 
{
    let transport = nodemailer.createTransport({ service: "Gmail", auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD }, });
    

    app.post('/api/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error

        let message = '';
        const { login, password } = req.body;

        const db = client.db("group13");
        const userResults = await db.collection('user').find({ login: login, password: password }).toArray();
        const profResults = await db.collection('professors').find({ login: login, password: password }).toArray();
        if(userResults.length == 0 && profResults.length == 0)
        {
            let ret = { message: "Invalid Username/Password Combination" };
            return res.status(200).json(ret);
        }
        else if (userResults.length > 0 && userResults[0].confirmed == false)
        {
            let ret = { message: "This Account Has Not Yet Been Activated" };
            return res.status(200).json(ret);
        }
        else if(profResults.length > 0 && profResults[0].confirmed == false)
        {
            let ret = { message: "This Account Has Not Yet Been Activated" };
            return res.status(200).json(ret);
        }

        let id = -1;
        let fn = '';
        let ln = '';
        let email = '';
        let privilege = '';

        if (userResults.length > 0) {
            id = userResults[0]._id;
            fn = userResults[0].firstname;
            ln = userResults[0].lastname;
            email = userResults[0].email;
            privilege = userResults[0].privilege;
            let ret = { _id: id, firstname: fn, lastname: ln, email: email, privilege: privilege, message: '' };
            return res.status(200).json(ret);
        }
        else if(profResults.length > 0)
        {
            id = profResults[0]._id;
            fn = profResults[0].firstname;
            ln = profResults[0].lastname;
            email = profResults[0].email;
            privilege = profResults[0].privilege;
            let ret = { _id: id, firstname: fn, lastname: ln, email: email, privilege: privilege, message: '' };
            return res.status(200).json(ret);
        }
        else
        {
            let ret = { message: 'error with login endpoint' };
            return res.status(200).json(ret);
        }
    });

    app.post('/api/register', async (req, res, next) => {
        const db = client.db("group13");
        const { firstname, lastname, email, login, password, privilege } = req.body;

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let count = -1;
        let token = '';
        while (count != 0) {
            count = 0;
            token = '';
            for (let i = 0; i < 25; i++) {
                token += characters[Math.floor(Math.random() * characters.length)];
            }
            const tokenquery = { confirmationcode: token };
            count += await db.collection('user').count(tokenquery);
            count += await db.collection('professors').count(tokenquery);
            //console.log(count);
        }
        
        const baseSchedule = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
        let message = '';

        const query = { email: email };
        const query2 = {login: login};

        let exists = await db.collection('user').count(query);
        exists += await db.collection('professors').count(query);

        let loginExists = await db.collection('user').count(query2);
        loginExists += await db.collection('professors').count(query2);

        if (exists > 0) {
            let ret = { message: "User Already Registered" };
            res.status(200).json(ret);
        }
        else if (loginExists > 0)
        {
            let ret = { message: "Login Already Exists" };
            res.status(200).json(ret);
        }
        else if (exists == 0) {
            if (privilege == "student") {
                const newUser = { firstname: firstname, lastname: lastname, email: email, login: login, password: password, privilege: privilege, confirmed: false, confirmationcode: token,
                    resetInformation : {time: Date.now(), expiresAt: Date.now(), resetToken: ""}, appointment: {month: -1, day: -1, year: -1, dayofweek: -1, timeslot: -1, professorlist: []}};
                
                try {
                    const result = db.collection('user').insertOne(newUser);
                }
                catch (e) {
                    message = e.toString();
                    let ret = { message: message };
                    res.status(200).json(ret);
                }

                transport.sendMail({
                    from: "group13confirmation@gmail.com",
                    to: email,
                    subject: "mySDSchedule - Please Confirm Your Account",
                    html: `<h1>Email Confirmation</h1>
                    <h2>Hello ${firstname}</h2>
                    <p>Thank you for Registering!</p>
                    <p>To activate your account please click on the link below.</p>
                    <a href=https://cop4331-group13.herokuapp.com/api/confirm?confirmationcode=${token}> Click here</a>
                    </div>`,
                }).catch(err => console.log(err));

                let ret = { message: "confirmation email sent" };
                res.status(200).json(ret);
            }
            else if (privilege == "professor") {
                const newUser = { firstname: firstname, lastname: lastname, email: email, login: login, password: password, privilege: privilege, confirmed: false, confirmationcode: token,
                    resetInformation : {time: Date.now(), expiresAt: Date.now(), resetToken: ""}, schedule: baseSchedule, appointments: []};
                try {
                    const result = db.collection('professors').insertOne(newUser);
                }
                catch (e) {
                    message = e.toString();
                    let ret = { message: message };
                    res.status(200).json(ret);
                }

                transport.sendMail({
                    from: "group13confirmation@gmail.com",
                    to: email,
                    subject: "mySDSchedule - Please Confirm Your Account",
                    html: `<h1>Email Confirmation</h1>
                    <h2>Hello ${firstname}</h2>
                    <p>Thank you for Registering!</p>
                    <p>To activate your account please click on the link below.</p>
                    <a href=https://cop4331-group13.herokuapp.com/api/confirm?confirmationcode=${token}> Click here</a>
                    </div>`,
                }).catch(err => console.log(err));

                let ret = { message: "confirmation email sent" };
                res.status(200).json(ret);
            }
        }
    });

    app.get('/api/confirm', async (req, res) => {
        //console.log("entered confirm");
        const db = client.db("group13");
        const confirmationcode = req.query.confirmationcode;
        const query = { confirmationcode: confirmationcode };
        try {
            const checkIfInStudents = await db.collection('user').count(query);
            if (checkIfInStudents > 0) {
                const userToConfirm = db.collection('user').updateOne(query, { $set: { confirmed: true } });
                return res.redirect('https://cop4331-group13.herokuapp.com/');
            }

            const checkIfInProfessors = db.collection('professors').count(query);
            if (checkIfInProfessors > 0) {
                const userToConfirm = db.collection('professors').updateOne(query, { $set: { confirmed: true } });
                return res.redirect('https://cop4331-group13.herokuapp.com/');
            }

            let ret = {message: "Invalid Account Confirmation Link"}
            return res.status(400).send(ret);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });

    app.post('/api/recovery/sendrecovery', async (req, res) => {
        //console.log("started recovery");
        const {email} = req.body;
        const query = {email: email};
        const options = {upsert: false}
        let newResetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(newResetToken, Number(process.env.HASH_NUM))
        const updateDoc = { $set : {resetInformation: {time: Date.now(), expiresAt: Date.now() + 3600000, resetToken: hash}}}
        const db = client.db("group13");
        const userCount = await db.collection('user').count(query);
        if (userCount > 0)
        {
            const user = await db.collection('user').findOne(query);
            const updatedUser = await db.collection('user').updateOne(query, updateDoc, options);
            const userID = user._id;
            const firstName = user.firstname;
            transport.sendMail({
                from: "group13confirmation@gmail.com",
                to: email,
                subject: "mySDSchedule - Resetting Your Password",
                html: `
                <h2>Hello ${firstName}</h2>
                <p>To reset you password please click on the link below.</p>
                <a href=https://cop4331-group13.herokuapp.com/group13-project2/ConfirmPasswordPage?id=${userID}&resetToken=${newResetToken}> Click here</a>
                </div>`,
            }).catch(err => console.log(err));

            let ret = { message: "if an activated account with that email exists instructions for password recovery have been sent" };
            return res.status(200).json(ret);
        }

        const professorCount = await db.collection('professors').count(query);
        if (professorCount > 0)
        {
            const user = await db.collection('professors').findOne(query).toArray();
            const id = user._id;
            const firstName = user.firstname;
            transport.sendMail({
                from: "group13confirmation@gmail.com",
                to: email,
                subject: "mySDSchedule - Resetting Your Password",
                html: `
                <h2>Hello ${firstName}</h2>
                <p>To reset you password please click on the link below.</p>
                <a href=https://cop4331-group13.herokuapp.com/group13-project2/ConfirmPasswordPage?id=${userID}&resetToken=${newResetToken}}> Click here</a>
                </div>`,
            }).catch(err => console.log(err));

            let ret = { message: "if an activated account with that email exists instructions for password recovery have been sent" };
            return res.status(200).json(ret);
        }

        let ret = { message: "if an activated account with that email exists instructions for password recovery have been sent" };
        return res.status(200).json(ret);
    });

    app.post('/api/recovery/resetpassword', async (req, res) => {
        //console.log("entered reset");
        const db = client.db("group13");
        const {newPassword, userid, resetToken} = req.body;
        const query = {"_id": ObjectId(userid)};
        const options = {upsert: false}
        const updateDoc = { $set : {password: newPassword, resetInformation: {time: Date.now(), expiresAt: Date.now(), resetToken : " "}}}
        const userCount = await db.collection('user').count(query);
        if (userCount > 0)
        {
            //console.log("here");
            const user = await db.collection('user').findOne(query);
            //console.log(user.firstname);  
            const isValid = await bcrypt.compare(resetToken, user.resetInformation.resetToken);
            //console.log("made it through the compare");
            if (!isValid || (Date.now() > user.resetInformation.expiresAt))
            {
                //console.log(isValid);
                //console.log("found to be invalid");                
                let ret = { message: "Invalid or Expired Password Reset Link Provided" };
                return res.status(200).json(ret);
            }

            db.collection('user').updateOne(query, updateDoc, options)

            let ret = { message: "Password Successfully Updated" };
            return res.status(200).json(ret);

        }

        const professorCount = await db.collection('professors').count(query);
        if (professorCount > 0)
        {
            //console.log("here");
            const user = await db.collection('professors').findOne(query);
            //console.log(user.firstname);  
            const isValid = await bcrypt.compare(resetToken, user.resetInformation.resetToken);
            //console.log("made it through the compare");
            if (!isValid || (Date.now() > user.resetInformation.expiresAt))
            {
                //console.log(isValid);
                //console.log("found to be invalid");                
                let ret = { message: "Invalid or Expired Password Reset Link Provided" };
                return res.status(400).json(ret);
            }

            db.collection('professors').updateOne(query, updateDoc, options)

            let ret = { message: "Password Successfully Updated" };
            return res.status(200).json(ret);

        }

        let ret = { message: "Invalid or Expired Password Reset Link Provided" };
        return res.status(400).json(ret);

    });
    
    app.post('/api/updateschedule', async (req, res) => {
        let message = '';
        const { _id, schedule } = req.body;

        let newSchedule = [];
        newSchedule.push(schedule.Monday);
        newSchedule.push(schedule.Tuesday);
        newSchedule.push(schedule.Wednesday);
        newSchedule.push(schedule.Thursday);
        newSchedule.push(schedule.Friday);

        const db = client.db("group13");
        const options = {upsert: false};
        const updateDoc = { $set : {schedule: newSchedule}};
        const query = {_id: ObjectId(_id)};
        console.log(newSchedule);

        const results = await db.collection('professors').updateOne(query, updateDoc, options);
        // professor = await db.collection('professors').findOne(query);

        let ret = {message: "Schedule Successfully Updated"};
        res.status(200).json(ret);
    });

    app.post('/api/getschedule', async (req, res) => {
        let message = '';
        const { _id} = req.body;

        const db = client.db("group13");
        const query = {_id: ObjectId(_id)};

        const professor = await db.collection('professors').findOne(query);
        const schedule = professor.schedule;
        let scheduleToReturn = {Monday: schedule[0], Tuesday: schedule[1], Wednesday: schedule[2], Thursday: schedule[3], Friday: schedule[4]};
        
        let ret = {schedule: scheduleToReturn};
        res.status(200).json(ret);
    });

    // app.post('/api/gettimes', async (req, res) => {
    //     let message = '';
    //     //true if should search, false if skip
    //     const {searchMon, searchTues, searchWed, searchThurs, searchFri} = req.body;
    //     const db = client.db("group13");
    //     const collection = await db.collection('professors').find().toArray();
    //     let availableTimes = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    //     let availableProfessors = [[[],[],[],[],[]], [[],[],[],[],[]], [[],[],[],[],[]], [[],[],[],[],[]], [[],[],[],[],[]]];
    //     let i = 0, j = 0, k = 0;

    //     for (i = 0; i < 5; i++)
    //     {
    //         if (!searchMon && i == 0)
    //             continue;
    //         if (!searchTues && i == 1)
    //             continue;
    //         if (!searchWed && i == 2)
    //             continue;
    //         if (!searchThurs && i == 3)
    //             continue;
    //         if (!searchFri && i == 4)
    //             continue;
        
    //         for (j = 0; j < 8; j++)
    //         {
    //             let counter = 0;
    //             for (k = 0; k < collection.length; k++)
    //             {
    //                 if (collection[k].schedule[i][j] == 1)
    //                 {
    //                     counter++;
    //                     let name = collection[k].firstname + " " + collection[k].lastname;
    //                     let id = collection[k]._id;
    //                     availableProfessors[i][j].push({name: name, id: id})
    //                 }
    //             }
    //             if (counter >= 3)
    //             {
    //                 availableTimes[i][j] = 1;
    //             }
    //         }
    //     }

    //     let ret = {schedule: availableTimes, professors: availableProfessors};
    //     res.status(200).json(ret);
    // });

    app.post('/api/getavailabletimes', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        const { dates } = req.body;
        const db = client.db("group13");
        const professors = await db.collection('professors').find().toArray();
        let availableTimes = [];
        //loop over all days
        for (let i = 0; i < dates.length; i++)
        {
            console.log("loop " + i);
            let day = dates[i].day;
            let month = dates[i].month;
            let year = dates[i].year;
            let dayofweek = dates[i].dayofweek;
            let query = {date: {month: month, day: day, year: year, dayofweek: dayofweek}};

            const checkIfExists = await db.collection('dates').count(query);
            if (checkIfExists > 0)
            {
                console.log("found the day");
                let dateInDb = await db.collection('dates').findOne(query);
                let professorList = dateInDb.timeslot;
                let dayAvailability = [];
                let timeslotArray;
                //loop over all timeslots
                for(let j = 0; j < 8; j++)
                {
                    let counter = 0;
                    dayAvailability[j] = [];
                    tempDayAvailability = [];
                    if (professorList[j] != null)
                    {   
                        timeslotArray = professorList[j].professors;
                        for (let x = 0; x < timeslotArray.length; x++)
                        {
                            timeslotArray[x] = String(timeslotArray[x]);
                        }
                    }
                    for (let k = 0; k < professors.length; k++)
                    {
                        
                        if (professorList[j] != null && timeslotArray.includes(String(professors[k]._id)))
                        {
                            continue;
                        }
                        if (professors[k].schedule[dayofweek][j] == 1)
                        {
                            counter++;
                            let name = professors[k].firstname + " " + professors[k].lastname;
                            let id = professors[k]._id;
                            tempDayAvailability.push({name: name, id: id});
                        }
                    }
                    if (counter >= 3)
                    {
                        dayAvailability[j] = tempDayAvailability;
                    }
                }

                availableTimes.push(dayAvailability);
            }
            else
            {
                console.log("didnt find the day")
                let dayAvailability = [];
                //loop over all timeslots
                for(let j = 0; j < 8; j++)
                {
                    let counter = 0;
                    dayAvailability[j] = [];
                    tempDayAvailability = [];
                    for (let k = 0; k < professors.length; k++)
                    {
                        if (professors[k].schedule[dayofweek][j] == 1)
                        {
                            counter++;
                            let name = professors[k].firstname + " " + professors[k].lastname;
                            let id = professors[k]._id;
                            tempDayAvailability.push({name: name, id: id});
                        }
                    }

                    if (counter >= 3)
                    {
                        dayAvailability[j] = tempDayAvailability;
                    }
                }

                availableTimes.push(dayAvailability);
            }
        }

        let counter = 0;
        for (let i = 0; i < availableTimes.length; i++)
        {
            for (let j = 0; j < 8; j++)
            {
                if (availableTimes[i][j].length == 0)
                {
                    counter++;
                }
            }
        }

        if ((availableTimes.length * 8) == counter)
        {
            let ret = {message: "No Appointments Found"}
            return res.status(200).json(ret);
        }
        else
        {
            let ret = {availableTimes};
            return res.status(200).json(ret);
        }
        
    });

    app.post('/api/getavailabletimesbyslot', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        const { dates } = req.body;
        const db = client.db("group13");
        const professors = await db.collection('professors').find().toArray();
        let availableTimes = [];
        //loop over all days
        for (let i = 0; i < dates.length; i++)
        {
            console.log("loop " + i);
            let day = dates[i].day;
            let month = dates[i].month;
            let year = dates[i].year;
            let dayofweek = dates[i].dayofweek;
            let daystimeslot = dates[i].timeslot;
            let query = {date: {month: month, day: day, year: year, dayofweek: dayofweek}};

            const checkIfExists = await db.collection('dates').count(query);
            if (checkIfExists > 0)
            {
                //console.log("found the day");
                let dateInDb = await db.collection('dates').findOne(query);
                let professorList = [];
                if (dateInDb.timeslot[daystimeslot] != null)
                {
                    professorList = dateInDb.timeslot[daystimeslot];
                }
                let timeslotArray = [];
                //loop over all timeslots
                //for(let j = 0; j < 8; j++)
                //{
                let counter = 0;
                timeslotAvailability = [];
                tempTimeslotAvailability = [];
                if (dateInDb.timeslot[daystimeslot] != null)
                {   
                    timeslotArray = professorList.professors;
                    for (let x = 0; x < timeslotArray.length; x++)
                    {
                        timeslotArray[x] = String(timeslotArray[x]);
                    }
                }
                for (let k = 0; k < professors.length; k++)
                {
                    
                    if (professorList != null && timeslotArray.includes(String(professors[k]._id)))
                    {
                        continue;
                    }
                    if (professors[k].schedule[dayofweek][daystimeslot] == 1)
                    {
                        counter++;
                        let name = professors[k].firstname + " " + professors[k].lastname;
                        let id = professors[k]._id;
                        tempTimeslotAvailability.push({name: name, id: id});
                    }
                }
                if (counter >= 3)
                {
                    timeslotAvailability = tempTimeslotAvailability;
                }
                //}
                
                availableTimes.push(timeslotAvailability);
                console.log(timeslotAvailability);
            }
            else
            {
                console.log("didnt find the day")
                //loop over all timeslots
                // for(let j = 0; j < 8; j++)
                // {
                    let counter = 0;
                    timeslotAvailability = [];
                    tempTimeslotAvailability = [];
                    for (let k = 0; k < professors.length; k++)
                    {
                        if (professors[k].schedule[dayofweek][daystimeslot] == 1)
                        {
                            counter++;
                            let name = professors[k].firstname + " " + professors[k].lastname;
                            let id = professors[k]._id;
                            tempTimeslotAvailability.push({name: name, id: id});
                        }
                    }

                    if (counter >= 3)
                    {
                        timeslotAvailability = tempTimeslotAvailability;
                    }
                // }

                availableTimes.push(timeslotAvailability);
            }
        }

        let counter = 0;
        for (let i = 0; i < availableTimes.length; i++)
        {
            if (availableTimes[i].length == 0)
            {
                counter++;
            }
        }

        if (availableTimes.length == counter)
        {
            let ret = {message: "No Appointments Found"}
            return res.status(200).json(ret);
        }
        else
        {
            let ret = {availableTimes};
            return res.status(200).json(ret);
        }
        
    });

    app.post('/api/reservetime', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        let { professor1, professor2, professor3, month, day, year, dayofweek, timeslot, userid, title, summary } = req.body;
        month = parseInt(month);
        day = parseInt(day);
        year = parseInt(year);
        dayofweek = parseInt(dayofweek);
        timeslot = parseInt(timeslot);
        const db = client.db("group13");
        const options = {upsert: false};
        const userQuery = {_id: ObjectId(userid)};

        const user = await db.collection('user').findOne(userQuery);
        if (user.appointment.month != -1)
        {
            let ret = {message: "Appointment Already Scheduled"};
            return res.status(200).json(ret);
        }
        let newDate;
        const query = {date: {month: month, day: day, year: year, dayofweek: dayofweek}};
        const professorList = [ObjectId(professor1), ObjectId(professor2), ObjectId(professor3)];
        const prof1Query = {_id: professorList[0]};
        const prof2Query = {_id: professorList[1]};
        const prof3Query = {_id: professorList[2]};
        const date = {month: month, day: day, year: year, dayofweek: dayofweek, timeslot: timeslot};
        let firstProfessor = await db.collection('professors').findOne(prof1Query);
        let secondProfessor = await db.collection('professors').findOne(prof2Query);
        let thirdProfessor = await db.collection('professors').findOne(prof3Query);        
        const checkIfExists = await db.collection('dates').count(query);
        //console.log(checkIfExists);
        if (checkIfExists > 0)
        {
            let date = await db.collection('dates').findOne(query);
            //console.log(date);
            let timeslots = date.timeslot;
            if (timeslots[timeslot] != null) 
            {
                for (let j = 0; j < timeslots[timeslot].professors.length; j++)
                {
                    let prof = String(timeslots[timeslot].professors[j]);
                    if (prof == String(professorList[0]) || prof == String(professorList[1]) || prof == String(professorList[2]))
                    {
                        let ret = {message: "Appointment Time Filled"};
                        return res.status(200).json(ret);
                    }
                }
            }
            // const newAppointment = {professors: professorList};
            // timeslots[timeslot] = newAppointment;
            if (timeslots[timeslot] == null)
            {
                timeslots[timeslot] = {professors: []};
            }
            for (let i = 0; i < professorList.length; i++)
            {
                timeslots[timeslot].professors.push(professorList[i]);
            }
            //console.log(timeslots);
            const updateDoc = {$set: {timeslot: timeslots}};
            const result = await db.collection('dates').updateOne(query, updateDoc, options);
            const userUpdate = {$set : {appointment: {month: month, day: day, year: year, dayofweek: dayofweek, timeslot: timeslot, professorlist: professorList}}};
            const userUpdateFinished = await db.collection('user').updateOne(userQuery, userUpdate, options);
            const newProfAppointment = {userid: ObjectId(userid), month: month, day: day, year: year, dayofweek: dayofweek, timeslot: timeslot, title: title, summary: summary};

            let firstProfessorFlag = true;
            let secondProfessorFlag = true;
            let thirdProfessorFlag = true;
            if (firstProfessor.appointments.length != 1)
            {
                for (let x = 0; x < firstProfessor.appointments.length - 1; x++)
                {
                    let curDay = firstProfessor.appointments[x].dayofweek;
                    let curTimeslot = firstProfessor.appointments[x].timeslot;

                    let nextDay = firstProfessor.appointments[x+1].dayofweek;
                    let nextTimeslot = firstProfessor.appointments[x+1].timeslot;

                    if ((curDay <= dayofweek && dayofweek <= nextDay && curTimeslot < timeslot && timeslot < nextTimeslot) || (curDay < dayofweek && dayofweek < nextDay) || (curDay <= dayofweek && dayofweek < nextDay && curTimeslot < timeslot))
                    {
                        console.log('entered');
                        firstProfessorFlag = false;
                        firstProfessor.appointments.splice((x + 1), 0, newProfAppointment);
                        break;
                    }
                }
                if (firstProfessorFlag)
                {
                    console.log('failed to enter ' + firstProfessorFlag);
                    firstProfessor.appointments.push(newProfAppointment);
                }
            }
            else
            {
                console.log("entered else")
                let curDay = firstProfessor.appointments[0].dayofweek;
                let curTimeslot = firstProfessor.appointments[0].timeslot;

                if ((curDay <= dayofweek && curTimeslot < timeslot) || curDay < dayofweek)
                {
                    console.log("found old appointment to be sooner")
                    firstProfessor.appointments.push(newProfAppointment);
                }
                else
                {
                    console.log("found old appointment to be older")
                    firstProfessor.appointments.splice(0, 0, newProfAppointment);
                }
            }

            if (secondProfessor.appointments.length != 1)
            {
                for (let x = 0; x < secondProfessor.appointments.length - 1; x++)
                {
                    let curDay = secondProfessor.appointments[x].dayofweek;
                    let curTimeslot = secondProfessor.appointments[x].timeslot;

                    let nextDay = secondProfessor.appointments[x+1].dayofweek;
                    let nextTimeslot = secondProfessor.appointments[x+1].timeslot;

                    if ((curDay <= dayofweek && dayofweek <= nextDay && curTimeslot < timeslot && timeslot < nextTimeslot) || (curDay < dayofweek && dayofweek < nextDay) || (curDay <= dayofweek && dayofweek < nextDay && curTimeslot < timeslot))
                    {
                        secondProfessorFlag = false;
                        secondProfessor.appointments.splice((x + 1), 0, newProfAppointment);
                        break;
                    }
                }
                if (secondProfessorFlag)
                {
                    secondProfessor.appointments.push(newProfAppointment);
                }
            }
            else
            {
                let curDay = secondProfessor.appointments[0].dayofweek;
                let curTimeslot = secondProfessor.appointments[0].timeslot;

                if ((curDay <= dayofweek && curTimeslot < timeslot) || curDay < dayofweek)
                {
                    secondProfessor.appointments.push(newProfAppointment);
                }
                else
                {
                    secondProfessor.appointments.splice(0, 0, newProfAppointment);
                }
            }

            if (thirdProfessor.appointments.length != 1)
            {
                for (let x = 0; x < thirdProfessor.appointments.length - 1; x++)
                {
                    let curDay = thirdProfessor.appointments[x].dayofweek;
                    let curTimeslot = thirdProfessor.appointments[x].timeslot;

                    let nextDay = thirdProfessor.appointments[x+1].dayofweek;
                    let nextTimeslot = thirdProfessor.appointments[x+1].timeslot;

                    if ((curDay <= dayofweek && dayofweek <= nextDay && curTimeslot < timeslot && timeslot < nextTimeslot) || (curDay < dayofweek && dayofweek < nextDay) || (curDay <= dayofweek && dayofweek < nextDay && curTimeslot < timeslot))
                    {
                        thirdProfessorFlag = false;
                        thirdProfessor.appointments.splice((x + 1), 0, newProfAppointment);
                        break;
                    }
                }
                if (thirdProfessorFlag)
                {
                    thirdProfessor.appointments.push(newProfAppointment);
                }
            }
            else
            {
                let curDay = thirdProfessor.appointments[0].dayofweek;
                let curTimeslot = thirdProfessor.appointments[0].timeslot;

                if ((curDay <= dayofweek && curTimeslot < timeslot) || curDay < dayofweek)
                {
                    thirdProfessor.appointments.push(newProfAppointment);
                }
                else
                {
                    thirdProfessor.appointments.splice(0, 0, newProfAppointment);
                }
            }

            const update1 = await db.collection('professors').replaceOne(prof1Query, firstProfessor);
            const update2 = await db.collection('professors').replaceOne(prof2Query, secondProfessor);
            const update3 = await db.collection('professors').replaceOne(prof3Query, thirdProfessor);
        }
        else
        {
            newDate = {date : {month : month, day : day, year : year, dayofweek : dayofweek}, timeslot: []};
            const newAppointment = {professors: professorList};
            newDate.timeslot[timeslot] = newAppointment;
            const insert = await db.collection('dates').insertOne(newDate);
            const userUpdate = {$set : {appointment: {month: month, day: day, year: year, dayofweek: dayofweek, timeslot: timeslot, professorlist: professorList}}};
            const userUpdateFinished = await db.collection('user').updateOne(userQuery, userUpdate, options);
            const newProfAppointment = {userid: ObjectId(userid), month: month, day: day, year: year, dayofweek: dayofweek, timeslot: timeslot, title: title, summary: summary};
            firstProfessor.appointments.push(newProfAppointment);
            secondProfessor.appointments.push(newProfAppointment);
            thirdProfessor.appointments.push(newProfAppointment);
            const update1 = await db.collection('professors').replaceOne(prof1Query, firstProfessor);
            const update2 = await db.collection('professors').replaceOne(prof2Query, secondProfessor);
            const update3 = await db.collection('professors').replaceOne(prof3Query, thirdProfessor);
        }
        let emails = [firstProfessor.email, secondProfessor.email, thirdProfessor.email];
        let names = [firstProfessor.lastname, secondProfessor.lastname, thirdProfessor.lastname];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let times = ["9:00 a.m.", "10:30 a.m.", "12:00 p.m.", "1:30 p.m.", "3:00 p.m.", "4:30 p.m.", "6:00 p.m.", "7:30 p.m."];
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        for (let i = 0; i < 3; i++)
        {
            transport.sendMail({
                from: "group13confirmation@gmail.com",
                to: emails[i],
                subject: "mySDSchedule - Appointment Made For Senior Design Presentation",
                html: `<h2>Professor ${names[i]},</h2>
                <p>An appointment has been made for a senior design presentation. The date and time for the presentation are as follows.</p>
                <p>Day: ${days[date.dayofweek]}</p>
                <p>Time: ${times[timeslot]}</p>
                </div>`,
            }).catch(err => console.log(err));
        }
        
        let ret = {message: "Schedule Successfully Updated"};
        res.status(200).json(ret);
    });

    app.post('/api/getreservation', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        const { userid } = req.body;

        const db = client.db("group13");
        const userQuery = {_id: ObjectId(userid)};
        const user = await db.collection('user').findOne(userQuery);
        let appointment = user.appointment;
        if (appointment.month == -1)
        {
            let ret = {message: "No Reservation Found"};
            res.status(200).json(ret);
        }
        else
        {
            const list = appointment.professorlist;
            const prof1 = await db.collection('professors').findOne(ObjectId(list[0]));
            const prof2 = await db.collection('professors').findOne(ObjectId(list[1]));
            const prof3 = await db.collection('professors').findOne(ObjectId(list[2]));
            let professorNames = [];
            professorNames.push((prof1.firstname + " " + prof1.lastname));
            professorNames.push((prof2.firstname + " " + prof2.lastname));
            professorNames.push((prof3.firstname + " " + prof3.lastname));
            let ret = {month: appointment.month, day: appointment.day, year: appointment.year, dayofweek: appointment.dayofweek, timeslot: appointment.timeslot, professorlist: professorNames};
            res.status(200).json(ret);
        }
        
    });

    app.post('/api/deletereservation', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        const { userid } = req.body;

        const db = client.db("group13");
        const options = {upsert: false};
        const userQuery = {_id: ObjectId(userid)};
        let user = await db.collection('user').findOne(userQuery);
        let appointment = user.appointment;
        
        if (appointment.month == -1)
        {
            let ret = {message: "No Reservation Found To Delete"};
            return res.status(200).json(ret);
        }
        else
        {
            const prof1ID = String(appointment.professorlist[0]);
            const prof2ID = String(appointment.professorlist[1]);
            const prof3ID = String(appointment.professorlist[2]);
            const prof1Query = {_id: ObjectId(prof1ID)};
            const prof2Query = {_id: ObjectId(prof2ID)};
            const prof3Query = {_id: ObjectId(prof3ID)};
            let prof1 = await db.collection('professors').findOne(prof1Query);
            let prof2 = await db.collection('professors').findOne(prof2Query);
            let prof3 = await db.collection('professors').findOne(prof3Query);
            for (let i = 0; i < prof1.appointments.length; i++)
            {
                if(prof1.appointments[i] != null && (String(prof1.appointments[i].userid) == String(userid)))
                {
                    prof1.appointments.splice(i, 1);
                    break;
                }
            }   
            for (let i = 0; i < prof2.appointments.length; i++)
            {
                if(prof2.appointments[i] != null && (String(prof2.appointments[i].userid) == String(userid)))
                {
                    prof2.appointments.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < prof3.appointments.length; i++)
            {
                if(prof3.appointments[i] != null && (String(prof3.appointments[i].userid) == String(userid)))
                {
                    prof3.appointments.splice(i, 1);
                    break;
                }
            }
            const updateProf1 = await db.collection('professors').replaceOne(prof1Query, prof1);
            const updateProf2 = await db.collection('professors').replaceOne(prof2Query, prof2);
            const updateProf3 = await db.collection('professors').replaceOne(prof3Query, prof3);
            const dateQuery = {date: {month: appointment.month, day: appointment.day, year: appointment.year, dayofweek: appointment.dayofweek}};
            let date = await db.collection('dates').findOne(dateQuery);
            const day = date.date.day;
            const month = date.date.month;
            const year = date.date.year;
            const dayofweek = date.date.dayofweek;
            let professorList = date.timeslot[appointment.timeslot].professors;
            // console.log(professorList);
            let newList = [];
            for (let x = 0; x < professorList.length; x++)
            {
                let curProf = String(professorList[x]);
                // console.log(curProf);
                if (!(curProf == prof1ID || curProf == prof2ID || curProf == prof3ID))
                {
                    newList.push(professorList[x]);
                }
            }
            date.timeslot[appointment.timeslot].professors = newList;
            //console.log(date.timeslot);
            let updateDate = {$set : {timeslot : date.timeslot}};
            let updateDoc = {$set : {appointment: {month: -1, day: -1, year: -1, dayofweek: -1, timeslot: -1, professorlist: []}}};
            const updated = await db.collection('user').updateOne(userQuery, updateDoc, options);
            const updatedDate = await db.collection('dates').updateOne(dateQuery, updateDate, options);
            
            let emails = [prof1.email, prof2.email, prof3.email];
            let names = [prof1.lastname, prof2.lastname, prof3.lastname];
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let times = ["9:00 a.m.", "10:30 a.m.", "12:00 p.m.", "1:30 p.m.", "3:00 p.m.", "4:30 p.m.", "6:00 p.m.", "7:30 p.m."];
            let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            for (let i = 0; i < 3; i++)
            {
                transport.sendMail({
                    from: "group13confirmation@gmail.com",
                    to: emails[i],
                    subject: "mySDSchedule - Cancelled Senior Design Presentation",
                    html: `<h2>Professor ${names[i]},</h2>
                    <p>An appointment has been cancelled for a senior design presentation. The day and time for the cancelled presentation are as follows.</p>
                    <p>Day: ${days[dayofweek]}</p>
                    <p>Time: ${times[appointment.timeslot]}</p>
                    </div>`,
                }).catch(err => console.log(err));
            }
            
            let ret = {message: "Reservation Successfully Deleted"};
            return res.status(200).json(ret);
        }
        
    });
    
    app.post('/api/showappointments', async (req, res) => {
        let message = '';
        //day of week as index, timeslot as index, professors as object ids
        const { userid } = req.body;

        const db = client.db("group13");
        const professorQuery = {_id: ObjectId(userid)};
        const professor = await db.collection('professors').findOne(professorQuery);
        let appointments = professor.appointments;
        if (appointments.length == 0)
        {
            let ret = {message: "No Appointments Scheduled"};
            return res.status(200).json(ret);
        }
        else
        {
            
            let ret = {appointments: appointments};
            return res.status(200).json(ret);
        }
    });

    app.post('/api/updateinformation', async (req, res) => {
        const { firstname, lastname, email, _id } = req.body;

        const db = client.db("group13");
        const query = {_id: ObjectId(_id)};

        const userCount = await db.collection('user').count(query);
        const professorCount = await db.collection('professors').count(query);
        if (userCount > 0)
        {
            let userToUpdate = await db.collection('user').findOne(query);
            userToUpdate.firstname = firstname;
            userToUpdate.lastname = lastname;
            userToUpdate.email = email;
            const update = await db.collection('user').replaceOne(query, userToUpdate);
        }
        else if(professorCount > 0)
        {
            let professorToUpdate = await db.collection('professors').findOne(query);
            professorToUpdate.firstname = firstname;
            professorToUpdate.lastname = lastname;
            professorToUpdate.email = email;
            const update = await db.collection('professors').replaceOne(query, professorToUpdate);
        }
        else
        {
            let ret = {message: "id not found"};
            return res.status(200).json(ret);
        }


        let ret = {firstname: firstname, lastname: lastname, email: email, message: "Information Successfully Updated"};
        return res.status(200).json(ret);
    });

    app.post('/api/sendlogin', async (req, res) => {
        const { email } = req.body;

        const db = client.db("group13");
        const query = {email: email};
        let login = "";
        let firstName = "";
        const userCount = await db.collection('user').count(query);
        const professorCount = await db.collection('professors').count(query);
        if (userCount > 0)
        {
            let getUser = await db.collection('user').findOne(query);
            login = getUser.login;
            firstName = getUser.firstName;
        }
        else if(professorCount > 0)
        {
            let getProfessor = await db.collection('professors').findOne(query);
            login = getProfessor.login;
            firstName = getProfessor.firstname;
        }
        else
        {
            let ret = {message: "if an account with that email exists the login has been sent"};
            return res.status(200).json(ret);
        }

        transport.sendMail({
            from: "group13confirmation@gmail.com",
            to: email, 
            subject: "mySDSchedule - Login Information",
            html: `<h1>Login Information</h1>
            <h2>Hello ${firstName}</h2>
            <p>Your Login for mySDSchedule is provided below.</p>
            <b>${login}</b>
            </div>`,
        }).catch(err => console.log(err));

        let ret = { message: "if an account with that email exists the login has been sent"};
        return res.status(200).json(ret);
    });

    /*
    if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('frontend/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
        });
    }*/
}