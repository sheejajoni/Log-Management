import React, {useContext, useEffect, useState} from 'react'
import {injectIntl} from 'react-intl'
import Page from './Page'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import { UserContext} from "../context/user-context";
import getEHRPatient from '../utils/ehrRecord';
import getFullRecords from '../utils/fullRecords';
import HealthInfo from '../components/dashboard/HealthInfo'
import ArticleMatches from '../components/dashboard/ArticleMatches'
import TrialBanner from '../components/dashboard/TrialBanner'
// import HWComparison from '../components/dashboard/HWComparison'
import HealthStats from '../components/dashboard/HealthStats'
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from '../components/ErrorMessage'

import EditIcon from "@material-ui/icons/Edit";
import AddBox from "@material-ui/icons/AddBox";

import axios from "../utils/axios";

const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",

        },
        paper: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            alignItems: "center",
            color: theme.palette.grey.dark,
        },
        container: {
            width: '90%',
            maxWidth: '75rem',
            margin: 'auto',
        },
        title: {
            paddingBottom: theme.spacing(4),
            color: theme.palette.grey.darkest
        },
        titleBody: {
            '@media (max-width: 1100px)': {
                fontSize: '20px'
            },
            marginBottom: theme.spacing(6),
            color: theme.palette.grey.darkest
        },
        trialMatches: {
            flexDirection: "row",
            justify: "center",
            alignItems: "center",
            marginBottom: theme.spacing(4),
        },
        matchesLeft: {
            backgroundColor: theme.palette.secondary.main,
            paddingLeft: '6%',
            height: '350px',
            color: theme.palette.secondary.contrastText,
        },
        numMatches: {
            fontSize: '128px',
            fontWeight: 100,
            marginTop: theme.spacing(6),
        },
        loadingSpinner: {
            color: theme.palette.secondary.contrastText,
        },
        dividerLine: {
            width: '80%',
            borderBottomStyle: 'solid',
            marginBottom: theme.spacing(2),
        },
        matchesRight: {
            backgroundColor: theme.palette.secondary.pale,
            height: '350px',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
        matchesRightDisabled: {
            backgroundColor: theme.palette.secondary.pale,
            height: '350px',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            opacity: 0.2,
        },
        matchedTrialsContainer: {
            height: '60%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(8),
        },
        match: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: theme.palette.secondary.contrastText,
            paddingBottom: theme.spacing(1.5),
            paddingTop: theme.spacing(2),
        },
        skeletonMatch: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: theme.palette.secondary.contrastText,
            paddingBottom: theme.spacing(1.5),
            paddingTop: theme.spacing(2),
        },
        trialStatus: {
            color: theme.palette.secondary.main,
            fontSize: '11px',
            fontWeight: 900,
        },
        trialName: {
            fontSize: '16px',
            fontWeight: 900,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '80%',
            whiteSpace: 'nowrap',
        },
        matchesButton: {
            fontSize: '16px',
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            }
        },
        healthInfo: {
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(6),
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
        },
        createIcon: {
            float: 'right',
            padding: '20px',
            paddingBottom: '0px',
            '&:hover': {
                color: theme.palette.primary.light,
                cursor: 'pointer',
            }
        },
        healthInfoLabel: {
            color: theme.palette.primary.light,
            fontWeight: '16px',
        },
        healthInfoTop: {
            marginBottom: theme.spacing(2),
        },
        healthInfoTopItem: {
            paddingLeft: theme.spacing(6),
        },
        healthInfoTopMain: {
            paddingBottom: theme.spacing(3),
            '@media (max-width: 1100px)': {
                fontSize: '24px',
            }
        },
        healthInfoTopItemMiddle: {
            borderColor: theme.palette.primary.light,
            borderLeftWidth: "2px",
            borderLeftStyle: 'solid',
            borderRightWidth: "2px",
            borderRightStyle: 'solid',
            paddingLeft: theme.spacing(6),
            '@media (max-width: 500px)': {
                paddingLeft: theme.spacing(0),
                marginLeft: theme.spacing(6),
                borderStyle: 'none',
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
                borderTopWidth: "2px",
                borderTopStyle: 'solid',
                borderBottomWidth: "2px",
                borderBottomStyle: 'solid',
                marginBottom: theme.spacing(2),
                marginTop: theme.spacing(2),
            }
        },
        healthInfoBottom: {
            borderTopWidth: "1px",
            borderTopColor: theme.palette.primary.contrastText,
            borderTopStyle: 'solid',
            color: theme.palette.primary.contrastText,
        },
        healthInfoBottomItem: {
            paddingLeft: theme.spacing(6),
            paddingTop: theme.spacing(4),
            backgroundColor: theme.palette.primary.main,
            height: '150px',
        },
        card: {
            color: theme.palette.grey.dark,
            backgroundColor: theme.palette.primary.pale,
            textAlign: 'center',
            height: '80%',
            padding: theme.spacing(3),
        },
        cardConnect: {
            color: theme.palette.grey.dark,
            backgroundColor: theme.palette.primary.contrastText,
            textAlign: 'center',
            borderColor: theme.palette.primary.main,
            borderStyle: 'solid',
            height: '80%',
            padding: theme.spacing(3),
        },
        cardContent: {
            textAlign: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: 'center',
            height: '100%',
        },
        help: {
            marginBottom: theme.spacing(4)
        },
        helpButton: {
            width: '90%',
            marginTop: theme.spacing(3),
        },
        helpIcon: {
            color: theme.palette.primary.main,
            fontSize: '62px',
            marginBottom: theme.spacing(2),
        },
        helpText: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        noDataTop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            flexDirection: 'column'
        },
        noDataText: {
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            marginBottom: theme.spacing(2)
        },
        noDataButton: {
            backgroundColor: theme.palette.primary.main,
            textTransform: 'none',
            color: theme.palette.primary.contrastText,
            width: '20%',
            fontSize: '20px',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            }
        },
        healthInfoTopHalf: {
            height: '60%'
        }
    }))

const DashboardAccount = ({intl}) => {

    const classes = useStyles();
    const [profile, dispatch] = useContext(UserContext);

    const [status,setStatus]=useState("Pending")
    const [resourcestatus,setResourceStatus]=useState("ResourcePending")
    const [loading, setLoading] = useState(false);
    const [error, setErrors] = useState(false)

    const patientUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'

    const updateResource = (resourcestat) => {
        setResourceStatus(resourcestat);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
       console.log("here"+resourcestatus)
    setErrors({message: 'Please wait while we fetch your EHR data.', color: 'primary', icon: true})
    //const user = profile
    //user.pages = "Dashboard"
    //dispatch({type: 'update pages', payload: user})

}, [resourcestatus])
    // gets the doctors name if we can, and it isn't already entered
    useEffect(() => {


        var x =Object.keys(profile.careProvider).length;
    if (x===0) {
        //getEHRPatient(profile.uid)
        getFullRecords(profile.patientID)
            .then((response) => {
            //setResourceStatus("ResourceProcessed")

            if (response) {


                // alert(response.patient[0].careProvider[0].display);
                if (response.patient[0].careProvider) {
                    // alert(response.patient[0].careProvider[0].display);
                    const user = profile
                    const doctor = response.patient[0].careProvider[0].display.split(', ')
                    const doctorName = "Dr. " + [doctor[1], doctor[0]].join(' ')
                    user.careProvider = {name: doctorName, contact: null}
                    dispatch({type: 'update care provider', payload: user})
                }
            }
        })
    .catch((error) => {
            console.log('Error', error)
    })

    }

    localStorage.getItem("contentSearch")?localStorage.getItem("contentSearch"):localStorage.setItem('contentSearch', profile.interests[0])

}, [])



    useEffect(()=>{

        const source = axios.CancelToken.source()

        //alert("parent status"+status)

        axios.get(patientUrl + profile.patientID + '/manual-entry',
        {
            'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
            cancelToken: source.token,
        })
        .then((resp) => {

        if(resp.data.fhir_manual_entry.status === "Processed")
    {
        setStatus("Processed")
        // localStorage.setItem("status","Pending");

        //setLoading(false)

    }

else if(resp.data.fhir_manual_entry.status === "Fail")
    {
        setStatus("Fail")
        setErrors({message: 'sorry, failed to fetch health information', color: '#DF4B31', icon: true})
        // localStorage.setItem("status","Pending");

        //setLoading(false)

    }

    else
    if (status === "Pending") {

        setErrors({message: 'Please wait while we fetch your EHR data.', color: 'primary', icon: true})


        setInterval(()=>
        {
            //setStatus("Processed")
            //setStatus("Pending")
            // localStorage.setItem("status","Processed");



            GetStatus();


    }, 15000);
    }

})
.catch(err => console.log(err))


    return () => {
        source.cancel()
    }



},[status,profile]);


    function GetStatus ()  {
        //useEffect(() => { alert("hrere")

        //setLoading(true)
        const cleanVitalsKey = (key) => {
            const keys = key.split('-')
            if (keys.length === 1) {
                return key
            }
            const first = keys.shift()
            return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
        }


        const source = axios.CancelToken.source()


        axios.get(patientUrl + profile.patientID + '/manual-entry',
            {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` } ,
                cancelToken: source.token,
            })
            .then((resp) => {

            if(resp.data.fhir_manual_entry.status === "Pending")
        {
            setStatus("Pending")
            // localStorage.setItem("status","Pending");

        }


    else if(resp.data.fhir_manual_entry.status === "Fail")
        {
            setStatus("Fail")
            setErrors({message: 'failed to fetch health information', color: 'primary', icon: true})
            // localStorage.setItem("status","Pending");

            //setLoading(false)

        }

        else
        if (resp.data.fhir_manual_entry.status === "Processed") {
            setStatus("Processed")
            // localStorage.setItem("status","Processed");


            resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {

                const newVital = cleanVitalsKey(vital.key)
                console.log("key"+newVital);

            if(vital.details[0])

                profile[newVital] = vital.details[0].value


            if(vital.key === "weight") {


                if(vital.details[0].value.includes("kg")) //85.7 kg
                {
                    var newweight = vital.details[0].value.replace('kg','');

                    var convertweight = 2.20462262185* newweight;

                    convertweight = convertweight.toFixed(2);

                    profile.weight=parseInt(convertweight)

                }

                else {
                    profile.weight= parseInt(vital.details[0].value)
                }


            }


            if(vital.key === "height") {



                profile.height=vital.details[0].value




            }



            if(vital.key === "medications"
            )
            {

                console.log("vital" + JSON.stringify(vital))

                //profile.medications = vital.details
                //console.log("daaaa" + JSON.stringify(profile.medications))
                const medication = [...new Set(vital.details)]
                profile['medications'] = medication

            }

            if (vital.key === "diagnosis") {


                //profile.medications = vital.details
                //console.log("daaaa" + JSON.stringify(profile.medications))
                const diagnosis = [...new Set(vital.details)]
                profile['diagnosis'] = diagnosis
            }

            if (vital.key === "procedures") {


                //profile.medications = vital.details
                //console.log("daaaa" + JSON.stringify(profile.medications))
                const procedures = [...new Set(vital.details)]
                profile['procedures'] = procedures


            }

            else  profile['procedures'] = []

            if (vital.key === "allergies") {

                const allergies = [...new Set(vital.details)]
                profile['allergies'] = allergies


            }


            if (vital.key === "conditions") {


                //profile.medications = vital.details
                //console.log("daaaa" + JSON.stringify(profile.medications))
                const conditions = [...new Set(vital.details)]
                profile['conditions'] = conditions

            }

            if(vital.key === "height") {


                profile.height = profile.height.replace(/cm|/g,'')

            }

            if(profile.weight) {


                if(profile.weight.includes("kg")) //85.7 kg
                {
                    var newweight = profile.weight.replace('kg','');

                    var convertweight = 2.20462262185* newweight;

                    convertweight = convertweight.toFixed(2);

                    profile.weight=convertweight

                }

                if(profile.weight.includes("lbs")) //85.7 kg
                {
                    var newweight = profile.weight.replace('lbs','');

                    //var convertweight = 2.20462262185* newweight;

                    //convertweight = convertweight.toFixed(2);

                    profile.weight=newweight

                }


            }




            //console.log("prf val"+profile.physName);
        })
        }

    })
    .catch(err => console.log(err))


        return () => {
            source.cancel()
        }



        //}, [status, profile])
    }


    const handleCloseError = () => {
        setErrors(false)
    }



    return(
        <Page pageTitle={intl.formatMessage({id: 'dashboard_title'})} >
<Paper className={clsx(classes.paper)} elevation={6}>
        <div className={classes.container}>

    {/* Intro/ header */}
<Typography component={"h1"} variant={"h1"} className={classes.title}>
    Hello, {profile.firstName}
</Typography>
    <Typography variant={'body2'} className={classes.titleBody}>
    Below are quick ways for you to save your personal and health information. At any time you can change, refine or add to your health record. <br/>
    To add, change, delete or refine your health information, just click on the pencil icon <EditIcon/> and/or the +sign <AddBox/>. This will allow you to make any necessary changes or edits. <br/>
    As always, we thrive on your feedback and insights to make this experience better and more useful for you. </Typography>

    {status==="Pending" || resourcestatus==="ResourcePending" ?

        <div>
    <ErrorMessage errors={error} color='primary' handleClose={handleCloseError}/>
         <CircularProgress size={150} /></div> : null}
    {status==="Fail" ? <div><ErrorMessage errors={error} color='primary' handleClose={handleCloseError}/></div> : null}

<HealthStats profile={profile} onResourceUpdate={updateResource}/>


        <HealthInfo profile={profile} dispatch={dispatch}/>

        {/* <HWComparison profile={profile}/> */}
    {profile.interests[0]?

    <ArticleMatches profile={profile}/> : null}

<TrialBanner/>

    </div>
    </Paper>
    </Page>
)
}

export default injectIntl(DashboardAccount)