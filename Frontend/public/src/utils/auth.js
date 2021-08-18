import axios from './axios';

const authUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/auth'
const patientUrl = process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/patient/'

export default class Auth {

    constructor() {
        this.login = this.login.bind(this);
    }

    login(username, password) {
        const credentials = {
            email: username,
            password: password
        }

        const cleanVitalsKey = (key) => {
            const keys = key.split('-')
            if (keys.length === 1) {
                return key
            }
            const first = keys.shift()
            return first + keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')
        }

        return new Promise((resolve, reject) => {
                axios.post(authUrl + '/login', credentials)
                .then(function (response) {
                    localStorage.setItem("AUTH_TOKEN", response.data.token)
                    const profile = response.data.user

                    delete profile.birthday

                    axios.get(patientUrl + profile.patient_id,
                        { 'headers': { 'Authorization': `Bearer ${response.data.token}` } })
                        .then((resp) => {
                        if (resp.data.patient.connected_healthcare_systems) {
                        const networks = resp.data.patient.connected_healthcare_systems.map(network => {
                                return network['healthcare_systems']
                            })

                        const uniqueNetworks = [...new Set(networks.map(network => network.id))].map(id => networks.find(network => network.id === id))
                        profile.networks = uniqueNetworks
                    }


                    profile.onboarded = resp.data.patient.onboarded
                    if (resp.data.patient.onboarded) {
                        profile.onboarded = resp.data.patient.onboarded
                        axios.get(patientUrl + profile.patient_id + '/manual-entry',
                            { 'headers': { 'Authorization': `Bearer ${response.data.token}` } })
                            .then((resp) => {

                            if(resp.data.fhir_manual_entry.manual_entry_data.length>0) {

                            resp.data.fhir_manual_entry.manual_entry_data.forEach(vital => {
                                const newVital = cleanVitalsKey(vital.key)
                                console.log("key"+newVital);

                            if(vital.details[0])

                                profile[newVital] = vital.details[0].value


                            if(vital.key === "weight") {
                               // alert("auth"+vital.details[0].value)


                                if(vital.details[0].value.includes("kg")) //85.7 kg
                                {
                                    var newweight = vital.details[0].value.replace('kg','');

                                    var convertweight = 2.20462262185* newweight;

                                    convertweight = convertweight.toFixed(2);

                                    profile.weight=parseInt(convertweight)

                                }

                                if(vital.details[0].value.includes("lbs")) //85.7 kg
                                {
                                    var newweight = vital.details[0].value.replace('lbs','');


                                    profile.weight=parseInt(newweight)

                                }


                            }


                           /* if(vital.key === "height") { alert("weight")

                                if(vital.details[0].value.includes("cm")){
                                    vital.details[0].value.height = vital.details[0].value.height.replace(/cm|/g,'')

                                }


                                if(vital.details[0].value.height.includes("-")){
                                    vital.details[0].value.height = vital.details[0].value.height.replace(/-|/g,'')

                                }


                                // setFeet(parseFeet(profile.height))
                                //setInches(parseInch(profile.height))

                                //alert(profile.height+"inch"+profileInches+"feet"+profileFeet)

                            }*/


                            axios.get(patientUrl + profile.patient_id + '/interest',
                                { 'headers': { 'Authorization': `Bearer ${response.data.token}` } })
                                .then((resp) => {

                                if(resp.data.interests.length>0){

                                const sorted = resp.data.interests.sort((a, b) => -a.timestamp.localeCompare(b.timestamp))
                            const latest = sorted[0].timestamp
                            profile.interests = sorted.filter(interest => interest.timestamp.split('.')[0] === latest.split('.')[0]).map(interest => interest.interest)
                            resolve(profile)}
                            else {
                                profile.interests = []
                                resolve(profile)
                            }

                        })
                        .catch(err => console.log(err))
                        }) }

                    else {

                            axios.get(patientUrl + profile.patient_id + '/interest',
                                { 'headers': { 'Authorization': `Bearer ${response.data.token}` } })
                                .then((resp) => {
                                if(resp.data.interests.length>0){
                                const sorted = resp.data.interests.sort((a, b) => -a.timestamp.localeCompare(b.timestamp))
                            const latest = sorted[0].timestamp
                            profile.interests = sorted.filter(interest => interest.timestamp.split('.')[0] === latest.split('.')[0]).map(interest => interest.interest)
                            resolve(profile)}
                        else {
                                profile.interests = []
                                resolve(profile)
                            }

                        })
                        .catch(err => console.log(err))

                        }



                    })

                    .catch(err => console.log(err))



                    } else {

                        resolve(profile)
                    }

                })
                    .catch((err) => {
                        err.response = {}
                    err.response.status = 500
                    reject(err)
                })
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                })
                .finally(function () {

                });
    });
    }

    verifyUser(email, password, verification) {
        const credentials = {
            email,
            password,
            verification
        }

        return new Promise((resolve, reject) => {
                axios.post(authUrl + '/email/verification', credentials)
                .then(function (response) {
                    localStorage.setItem("AUTH_TOKEN", response.data.token)
                    const profile = response.data.user
                    resolve(profile)
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                })
                .finally(function () {

                });
    });
    }

    createUser(user){
        return new Promise((resolve, reject) => {
                axios.post(authUrl + '/signup', user)
                .then(function (response) {
                    const profile = response.data.user
                    // localStorage.setItem("AUTH_TOKEN", response.data.token)
                    resolve(profile);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                })
                .finally(function () {

                });
    });

    }

    createEmployeeUser(user){
        return new Promise((resolve, reject) => {
                axios.post(authUrl + '/signup/employee', user)
                .then(function (response) {
                    const profile = response.data.user
                    // localStorage.setItem("AUTH_TOKEN", response.data.token)
                    resolve(profile);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                })
                .finally(function () {

                });
    });

    }
}

