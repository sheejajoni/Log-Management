import React, { useState, useContext, useEffect } from "react";
import { injectIntl } from "react-intl";
import Page from "./Page";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import { UserContext } from "../context/user-context";
import axios from "../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ErrorMessage from "../components/ErrorMessage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import NoConnectionError from "../components/NoConnectionError";
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { Select, MenuItem, InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
        root: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignContent: "center",
            justifyContent: "center",
        },
        paper: {
            paddingTop: theme.spacing(4),
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: theme.palette.grey.pale,
            alignItems: "center",
            color: theme.palette.grey.dark,
        },
        container: {
            maxWidth: "75rem",
            width: "90%",
            margin: "auto",
            paddingLeft: theme.spacing(5),
        },
        searchBars: {
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: theme.spacing(4),
            marginTop: "0px",
        },
        searchTitle: {
            fontWeight: "bold",
            color: theme.palette.grey.dark,
        },
        title: {
            marginBottom: theme.spacing(4),
            color: theme.palette.grey.darkest,
        },
        bottomContainer: {
            backgroundColor: theme.palette.grey.contrastText,
            paddingTop: theme.spacing(2),
            width: "100%",
        },
        trialsContainer: {
            backgroundColor: "white",
            paddingTop: theme.spacing(2),
        },
        trialButtons: {
            //marginTop: theme.spacing(2)
        },
        learnButton: {
            marginRight: theme.spacing(3),
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            textTransform: "uppercase",
            marginRight: "38rem" // email correction 8. added marginRight styling
        },

        PaginationButton: {
            width: "20%",
            height: "50px",
            margin: "20px",
            fontSize: "18px",
            color: "#fff",
            textTransform: "uppercase",
        },

        trialListItem: {
            marginBottom: theme.spacing(4),
            borderBottomWidth: "1px",
            borderBottomColor: theme.palette.grey.main,
            borderBottomStyle: "solid",
        },
        trialInfo: {
            height: "100%",
            paddingBottom: theme.spacing(4),
            width: "100%",
        },
        trialName: {
            color: theme.palette.grey.darkest,
            fontSize: "18px",
            marginBottom: "20px",
            fontFamily: "Gilroy-SemiBold",
            letterSpacing: "1.4px",
        },
        trialDesc: {
            paddingBottom: theme.spacing(2),
        },
        trialList: {},
        articleAvatar: {
            textAlign: "center",
            margin: "auto",
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        loadingCircle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
        },
        bodyText: {
            height: "125px",
            width: "100%",
            overflow: "auto",
            fontSize: "16px",
            color: theme.palette.grey.darkest,
            letterSpacing: "1.4px",
        },
        articleFull: {
            paddingLeft: "5%",
            paddingRight: "5%",
            borderLeftStyle: "solid",
            borderColor: theme.palette.grey.light,
            borderWidth: "2px",
        },
        articleContainer: {
            backgroundColor: theme.palette.grey.contrastText,
            paddingTop: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
        backButton: {
            width: "70%",
            marginTop: theme.spacing(8),
        },
        resultsContainer: {},
        filtersContainer: {
            borderRightStyle: "solid",
            borderColor: theme.palette.grey.light,
            borderWidth: "2px",
        },
        // filters: {
        //     marginLeft: theme.spacing(16),
        // },
        filterTitle: {
            marginBottom: theme.spacing(2),
        },
        radios: {
            paddingBottom: theme.spacing(2),
            borderBottomStyle: "solid",
            borderColor: theme.palette.grey.light,
            borderWidth: "1px",
            width: "80%",
        },
        sort: {
            marginBottom: "20px",
            paddingLeft: theme.spacing(1),
            width: "35%",
        },
        selectedSort: {
            color: theme.palette.secondary.main,
        },
        diagnosisontainer: {
            paddingTop: theme.spacing(1.5),
            float: "left",
            marginRight: "5px",
        },

        searchContainer: {
            width: "100%",
            height: "86px", //email correction 7. replacing 150px with 86px
            marginRight: "20px",
            background: "theme.palette.grey.pale",
        },

        popupAlert: {
            //width: '50%',

            color: theme.palette.primary.dark,
            padding: theme.spacing(2, 0),
            //marginBottom: theme.spacing(4),
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            [theme.breakpoints.down("xs")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },

        popupButton: {
            //[theme.breakpoints.down('xs')]: {
            width: "30%",
            margin: "14px", // email correction 7. replacing "20px" to "14px"
            fontSize: "18px",
            color: "#fff",
            textTransform: "uppercase",
            height: "4.1rem", // email correction 7. replacing "3.75rem" to "4.1rem"
        },

        modalContainer: {
            width: "50%",
            padding: "0px 10px",
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.dark,

            marginBottom: theme.spacing(2),

            display: "flex",
            flexDirection: "row",

            [theme.breakpoints.down("xs")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },

        modalCheckBoxActive: {
            width: "90%",
            height: "70%",
            background: theme.palette.secondary.dark,
            borderRadius: "5px",
            float: "left",
            color: theme.palette.primary.light,
            padding: "5px",
            margin: "5%",
        },

        modalCheckBoxInActive: {
            width: "90%",
            height: "70%",
            color: "#fff",
            background: theme.palette.grey.main,
            borderRadius: "5px",
            float: "left",
            padding: "5px",
            margin: "5%",
        },

        modalButton: {
            width: "80%",
        },

        modalHeader: {
            width: "100%",
            height: "5%",
            borderRadius: 0,
            "@media (max-width:600px)": {
                padding: "300px",
            },
        },
        modalIcon: {
            float: "right",
            color: theme.palette.primary.main,
            margin: theme.spacing(1),
            fontSize: "36px",
        },
        modalBody: {
            color: theme.palette.grey.dark,
        },
        modalField: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            height: "100%",
        },
        modalPaper: {
            width: "70%",
            height: "90%",
            backgroundColor: "white",
            outline: 0,
            paddingLeft: "5%",
            overflow: "scroll",
        },
        modalFooter: {
            margin: "0px 0px 15px 110px",
            width: "30px",
            // padding: theme.spacing(2),
            color: theme.palette.grey.dark,
        },
        modal: {
            display: "flex",
            outline: 0,
            border: "0px",
            width: "100%",
            margin: "10%",
            paddingLeft: "5%",
        },
        progressStatus: {
            padding: "30px 0px 25px 0px",
            textAlign: "center",
        },
        addNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            margin: "10px",
        },
        cancelAddNotesButton: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
            borderWidth: "2px",
            "&:hover": {
                borderWidth: "2px",
            },
        },
        loadButton: {
            height: "60px",
            marginBottom: theme.spacing(5),
            fontSize: "18px",
        },
        icon: {
            fontSize: "20px",
        },
        listHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(6),
        },
        errorContainer: {
            width: "100%",
            marginTop: "9.375rem",
            paddingBottom: "12.5rem",
        },
        errorBox: {
            width: "100%",
            height: "25.625rem",
            background: theme.palette.grey.pale,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
        },
        connectImage: {
            width: "30%",
            marginTop: "-6.25rem",
            [theme.breakpoints.down("xs")]: {
                width: "50%",
            },
        },
        errorText: {
            width: "60%",
            textAlign: "center",
            marginBottom: "3.125rem",
            lineHeight: "2.25rem",
        },
        connectText: {
            width: "70%",
            textAlign: "center",
            lineHeight: "2.25rem",
            marginBottom: "7rem",
        },
        connectButton: {
            marginBottom: "3.125rem",
            width: "18.75rem",
            height: "3.75rem",
            fontSize: "1.125rem",
            [theme.breakpoints.down("sm")]: {
                width: "12rem",
                fontSize: "1rem",
            },
        },
        connectIcon: {
            marginRight: theme.spacing(1),
        },
        imageContainer: {
            backgroundColor: theme.palette.secondary.contrastText,
            flex: "0 0 auto",
            height: "200px",
            width: "200px",
            padding: theme.spacing(1),
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },

        noDiagContainer: {
            width: "100%",
            marginTop: "9.375rem",
            paddingBottom: "12.5rem",
        },
        noDiagBox: {
            width: "100%",
            height: "33.75rem",
            background: theme.palette.grey.pale,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
        },
    }));

const BootstrapInput = withStyles((theme) => ({
        root: {
            "label + &": {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            minHeight: "0.1876em",
            position: "relative",
            marginTop: "10px",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid #ced4da",
            fontSize: "1.5rem",
            padding: "28px 20px 15px 40px",
            //transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: "Gilroy-Medium",
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
            },
        },
    }))(InputBase);

const TreatmentInformation = ({ intl }) => {
    const history = useHistory();
    const classes = useStyles();
    const [, dispatch] = useContext(UserContext);
    const [trials, setTrials] = useState([]);
    const search = history.location.state ? history.location.state.search : false;
    const [diagOne, setDiagOne] = useState(search ? search : "");
    let searchString1 = diagOne.trim();
    const [url, setUrl] = useState(
        searchString1
            ? process.env.REACT_APP_ONGEV_API_BASEURL +
        "/api/" +
        process.env.REACT_APP_ONGEV_API_VERSION +
        "/sound-board/article"
            : ""
    );
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(search ? true : false);
    const [articleId, setArticleId] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [searched, setSearched] = useState(false);
    const article = history.location.state
        ? history.location.state.article
        : false;
    //const searchcont = history.location.state ? history.location.state.searchterm : false
    //alert(searchcont)
    // const [sort, setSort] = useState('relevant')
    const [offset, setOffset] = useState(1);
    const [page, setPage] = useState("1");
    const [pagesize, setPageSize] = useState("5");
    const [fullList, setFullList] = useState([]);
    const [chronicOne, setChronicOne] = useState("");
    //const searchTerm = search.split('-').join('+')

    //  jira 484
    const contentSort = localStorage.getItem("contentSort");
    const [sort, setSort] = useState(contentSort ? contentSort : "relevance"); // changes made for jira 484

    const [disablebtn, setDisablebtn] = useState(true); //email correction:- 4. previous button, replaced false with true
    let options = [];

    const [profile] = useContext(UserContext);

    //jira 484
    const contentSearch = localStorage.getItem("contentSearch");
    const [interest, setInterest] = useState(
        contentSearch === null ? search.toLowerCase() : contentSearch
    ); // changes made for jira 484

    const [conditionString, setConditionString] = useState("");
    const [conditionSearch, setConditionSearch] = useState("");

    const [resultArray, setResultArray] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [searchLength, setSearchLength] = useState(true);
    const [searchStatus, setSearchStatus] = useState(false);
    let [manualsearchterms, setManualsearchterms] = useState([]);
    const [checkedFhirItems, setCheckedFhirItems] = useState({});
    const interestList = ["medication", "treatment", "excercise"];

    const handleCloseError = () => {
        setErrors(false);
    };

    const handleCloseMessage = () => {
        setConditionSearch(false);
    };

    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleChange = (e) => {
        setInterest(e.target.value);
        //alert(interest)
        //getCondition();
    };

    useEffect(() => {
        setConditionSearch({
            message: "Fetching articles based on " + interest,
        icon: true,
});
    getCondition();
}, [interest, conditionString]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // buildUrl();
            setInterest(e.target.value);
            setConditionString("");
        }
    };
    const handleChangeFreeText = (value) => {
        setInterest(value);
        setConditionString("");
    };

    const addDetails = () => {
        axios
            .get(
                process.env.REACT_APP_ONGEV_API_BASEURL +
                /api/ +
                process.env.REACT_APP_ONGEV_API_VERSION +
                "/patient/" +
                profile.patientID +
                "/manual-search-terms",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                    },
                }
            )
            .then((response) => {
            if (response.data.success) {
            if (response.data.search_terms.terms.length > 0) {
                if (response.data.search_terms.status == "Processed") {
                    setSearchStatus(false);
                } else {
                    setSearchStatus(true);
                }
                setSearchLength(true);
            } else {
                setSearchLength(false);
            }
            setManualsearchterms(response.data);
        }
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/trial/treatment-search" });
        }

        //alert("errrrorrr"+error)
        //console.log('Error ', error)
        //setErrors({ message: "Unable to load trials", color: "error" });
        setLoading(false);
    });

        // var cloneArray = JSON.parse(JSON.stringify(searchterms));

        // setManualsearchterms(cloneArray);

        setOpenAdd(true);
    };

    const handleChangeFhirCondition = (event) => {
        for (var i = 0; i < manualsearchterms.search_terms.terms.length; i++) {
            if (
                manualsearchterms.search_terms.terms[i].term === event.target.name &&
                manualsearchterms.search_terms.terms[i].selected === false
            ) {
                manualsearchterms.search_terms.terms[i].selected = true;

                //setRecords([...records, {key: event.target.name, name:event.target.name, selected:true}]);
            } else if (
                manualsearchterms.search_terms.terms[i].term === event.target.name &&
                manualsearchterms.search_terms.terms[i].selected === true
            )
                manualsearchterms.search_terms.terms[i].selected = false;
        }

        setCheckedFhirItems({
                ...checkedFhirItems,
            [event.target.name]: event.target.checked,
    });
    };

    const add = () => {
        var manualarray = [];
        var searchtermsarray = [];
        manualarray = manualsearchterms.manual_entry.manual_entry_data;
        searchtermsarray = manualsearchterms.search_terms.terms;
        let terms = {};
        terms = manualsearchterms.search_terms;
        delete terms.status;
        var selectCondition = [];
        var selectConditionString = [];

        let conditionList = "";
        for (var i = 0; i < searchtermsarray.length; i++) {
            if (searchtermsarray[i].selected) {
                selectCondition.push({ term: searchtermsarray[i].term });
                selectConditionString.push(searchtermsarray[i].term);
            }
        }

        if (selectConditionString.length == 0) {
            conditionList = "";
        } else if (selectConditionString.length == 1) {
            conditionList = selectConditionString[0];
        } else if (selectConditionString.length > 1) {
            conditionList = "(";
            for (var j = 0; j < selectConditionString.length; j++) {
                conditionList = conditionList + selectConditionString[j] + "|";
            }

            conditionList = conditionList.slice(0, -1); // replaced -2 with -1, -1 considers the last char also
            conditionList = conditionList + ")";
        }
        setConditionString(conditionList);
        resultArray.length = 0;

        resultArray.push(selectCondition);
        setResultArray(...resultArray);

        axios
            .put(
                process.env.REACT_APP_ONGEV_API_BASEURL +
                /api/ +
                process.env.REACT_APP_ONGEV_API_VERSION +
                "/patient/" +
                profile.patientID +
                "/search-terms",
                terms,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                    },
                }
            )
            .then((response) => {
            if (response.data.success) {
            if (conditionList != "") {
                setConditionSearch({
                    message:
                    "Fetching articles based on health interest " +
                    interest +
                    " and conditions " +
                    conditionList,
                    icon: true,
                });
            }
            setOpenAdd(false);
        }
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/trial/treatment-search" });
        }
    });
    };

    useEffect(() => {
        getCondition();
}, [conditionString]);

    const handleChronicChange = (e) => {
        //setChronicOne(e.target.value);
        setChronicOne(e.target.value);

        //CTSearch(e.target.value);
    };

    const buildUrl = () => {
        setLoading(true);

        // if (searchString1) {
        setUrl(
            process.env.REACT_APP_ONGEV_API_BASEURL +
            "/api/" +
            process.env.REACT_APP_ONGEV_API_VERSION +
            "/sound-board/article"
        );
        // }
    };

    // const handleSortChange = (event) => {
    //     setSort(event.target.value);
    // };

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            buildUrl();
        }
    };

    const stopSearch = () => {
        setSearched(false);
        setLoading(false);
        setDiagOne("");
        setErrors(false);
        setFullList([]);
        setTrials([]);
        setCancel(true);
    };

    const handleLoadMore = () => {
        setOffset(offset + 1);
        setTrials(fullList.slice(0, (offset + 1) * 10));
    };

    /* let searchString = interest.trim().split(' ').join('+')
     if(chronicOne){
     let chronicString = chronicOne.replace(/ /g, '')
     searchString = searchString + '&' + chronicString
     }*/
    let searchString = interest + "&" + conditionString;

    const bodycont = {
        page: page,
        page_size: pagesize,
        published_after: "1901-01-01",
        query: searchString,
        sort_mode: sort,
    };

    // Watches changes in the url variable, then searches for articles when it changes
    useEffect(() => {
        profile.interests.forEach(function (element) {
        options.push(element);
        // conditionList.forceUpdate();
    });

    const searchTrials = () => {
        setLoading(true);
        console.log(url);
        setOffset(1);
        axios
            .post(url, bodycont, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                },
            })
            .then((response) => {
            const results = response.data.articles;
        let articleArray = [];
        articleArray = results;
        articleArray.sort((a, b) => b.score - a.score);
        if (articleArray.length > 0) {
            setFullList(articleArray);
            setTrials(articleArray);
        } else {
            setFullList([]);
            setTrials([]);
        }
        setErrors(false);
        setSearched(true);
        setLoading(false);
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/content/information" });
        }
        console.log("Error ", error);
        setErrors({ message: "Unable to load articles" });
        setLoading(false);
    });
    };

    if (url) {
        searchTrials();
    }
}, [url, dispatch, history, page, sort, chronicOne, interest]);

    useEffect(() => {
        if (articleId) {
            const source = axios.CancelToken.source();

            setLoading(true);
            console.log(articleId);
            axios
                .post(
                    process.env.REACT_APP_ONGEV_API_BASEURL +
                    "/api/" +
                    process.env.REACT_APP_ONGEV_API_VERSION +
                    "/sound-board/article",
                    bodycont,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                        },
                        cancelToken: source.token,
                    }
                )
                .then((response) => {
                for (let i = 0; i < response.data.articles.length; i++) {
                if (response.data.articles[i].id === articleId) {
                    const result = response.data.articles[i];
                    history.push("/content/information", { article: result });
                    setLoading(false);
                    setArticleId(false);
                }
            }
        })
        .catch((error) => {
                if (error.response && error.response.data === "Token is expired") {
                console.log("Token is expired");
                dispatch({ type: "token expired" });
                history.push("/signin", { ongevRoute: "/content/information" });
            }
            console.log("Error ", error);
            setErrors({ message: "Something went wrong" });
            setLoading(false);
        });

            return () => {
                source.cancel();
            };
        }
    }, [articleId, dispatch, history]);

    const getCondition = () => {
        axios
            .get(
                process.env.REACT_APP_ONGEV_API_BASEURL +
                /api/ +
                process.env.REACT_APP_ONGEV_API_VERSION +
                "/patient/" +
                profile.patientID +
                "/manual-search-terms",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                    },
                }
            )
            .then((response) => {
            if (response.data.success) {
            const details = response.data;

            const source = axios.CancelToken.source();

            setLoading(true);
            console.log(articleId);
            axios
                .post(
                    process.env.REACT_APP_ONGEV_API_BASEURL +
                    "/api/" +
                    process.env.REACT_APP_ONGEV_API_VERSION +
                    "/sound-board/article",
                    bodycont,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
                        },
                        cancelToken: source.token,
                    }
                )
                .then((response) => {
                const results = response.data.articles;
            let articleArray = [];
            articleArray = results;
            articleArray.sort((a, b) => b.score - a.score);
            if (articleArray.length > 0) {
                setFullList(articleArray);
                setTrials(articleArray);
            } else {
                setFullList([]);
                setTrials([]);
            }
            setErrors(false);
            setSearched(true);
            setLoading(false);
        })
        .catch((error) => {
                if (
                    error.response &&
            error.response.data === "Token is expired"
        ) {
                console.log("Token is expired");
                dispatch({ type: "token expired" });
                history.push("/signin", { ongevRoute: "/content/information" });
            }
            console.log("Error ", error);
            setErrors({ message: "Something went wrong" });
            setLoading(false);
        });

            return () => {
                source.cancel();
            };

            if (response.data.search_terms.terms.length > 0) {
                var qwerty = [];

                let conditionList = "(";
                for (var i = 0; i < response.data.search_terms.terms.length; i++) {
                    if (response.data.search_terms.terms[i].selected) {
                        qwerty.push({ term: response.data.search_terms.terms[i].term });
                        conditionList =
                            conditionList +
                            response.data.search_terms.terms[i].term +
                            "|";
                    }
                }
                conditionList = conditionList.slice(0, -1);
                setConditionString(conditionList + ")");

                resultArray.length = 0;
                //  for(var i=0;i<qwerty.length;i++)
                //{
                // if(qwerty[i].selected){

                resultArray.push(qwerty);
                setResultArray(...resultArray);
            }

            // alert("ssjd--" + JSON.stringify(manualsearchterms));
        }

        //setLoading(false);
    })
    .catch((error) => {
            if (error.response && error.response.data === "Token is expired") {
            console.log("Token is expired");
            dispatch({ type: "token expired" });
            history.push("/signin", { ongevRoute: "/content/information" });
        }

        //alert("errrrorrr"+error)
        //console.log('Error ', error)
        //setErrors({ message: "Unable to load trials", color: "error" });
        setLoading(false);
    });
    };
    useEffect(() => {
        if (article) {
            window.scrollTo(0, 0);
        }
    }, [article]);

    const getNextRecord = () => {
        let newpage = (parseInt(page) + 1).toString();

        setPage(newpage);
        setDisablebtn(false);
    };

    const getPrevRecord = () => {
        if (parseInt(page) > 1) {
            //email correction:- 4. previous button, replaced 2 with 1
            let newpage = (parseInt(page) - 1).toString();

            setPage(newpage);
        } else {
            //alert("No previous record")
            setDisablebtn(true);
        }
    };

    const renderTrial = (trial) => {
        return (
            <Grid
        container
        direction={"row"}
        className={classes.trialListItem}
        key={trial.id}
    >
    <Grid item sx={12} className={classes.trialInfo}>
    <div style={{ width: "100%" }}>
    <span style={{ float: "left", width: "30%" }}>
    <img src={trial.image_small.secure_url} alt={trial.title} />
    </span>
        <span style={{ float: "left", width: "60%" }}>
    <Typography className={classes.trialName}>
        {trial.title}
    </Typography>
        <Typography variant="body1" className={classes.bodyText}>
        {trial.description}
    </Typography>
        </span>
        </div>

        <div
        className={classes.trialButtons}
        style={{ clear: "both", float: "right" }}
    >
    <Button
        type={"button"}
        variant="contained" //email correction 9. replaced "outlined" with "Read More"
        className={classes.learnButton}
        color="primary"
        onClick={() => setArticleId(trial.id)}
    >
        {/* email correction 9. replaced "Read Article" with "Read More" */}
    <Typography variant={"button"}> Read More </Typography>
        </Button>
        </div>
        </Grid>
        </Grid>
    );
    };

    const renderFullArticle = (article) => {
        return (
            <Page pageTitle={intl.formatMessage({ id: "dashboard_title" })}>
    <Paper className={clsx(classes.paper)} elevation={6}>
            <div className={classes.container}>
    <Typography
        component={"h1"}
        variant={"h1"}
        className={classes.title}
    >
        {article.title}
    </Typography>
        </div>
        <div className={classes.articleContainer}>
    <div className={classes.container}>
    <ErrorMessage
        errors={errors ? errors : undefined}
        handleClose={handleCloseError}
            />
            <Grid
        container
        direction={"row"}
        className={classes.articleHolder}
    >
    <Grid item xs={2}>
            <Button
        className={classes.backButton}
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => {
            if (
                history.location.state &&
                history.location.state.previous === "dashboard"
            ) {
                history.push("/dashboard");
            } else {
                history.push("/content/information");
            }
        }}
    >
    <Typography variant={"button"}> Go Back </Typography>
        </Button>
        </Grid>
        <Grid item xs={10} className={classes.articleFull}>
    <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </Grid>
        </Grid>
        </div>
        </div>
        </Paper>
        </Page>
    );
    };

    if (article) {
        if (article.content.includes("<div")) {
            article.content = article.content.replace(
                /<p/g,
                '<p style={{fontFamily:"Gilroy-Medium", fontSize:"16pt", fontWeight:500, lineHeight:"22pt"}} '
            );
            //alert(article.content)
        }

        if (article.content.includes("a href")) {
            article.content = article.content.replace(
                /<a/g,
                '<a target={"_blank"}  '
            );
        }

        return renderFullArticle(article);
    }

    return (
        <Page pageTitle={intl.formatMessage({ id: "dashboard_title" })}>
<Paper
    className={clsx(classes.paper)}
    elevation={6}
    errors={errors ? errors : undefined}
        >
        <div className={classes.container}>
<Typography component={"h1"} variant={"h1"} className={classes.title}>
    {/* Search Articles, Research & Information */}
    {/* email corrections 6. */}
    Content For You
                </Typography>

                <div>
                <ErrorMessage
        color="primary"
    errors={conditionSearch}
    handleClose={handleCloseMessage}
        />
        </div>

        <div className={classes.searchBars}>
<div className={classes.searchContainer}>
<div style={{ display: "flex", width: "100%" }}>
<div className={classes.diagnosisontainer}>
<FormControl variant="outlined">
        {/*<Select style={{width:'350px'}}
         labelId="condition"

         inputProps={{
         id: "hey"
         }}
         onChange={handleChronicChange}
         input={<BootstrapInput />}

         >
         {resultArray.map(type => <MenuItem value={type.term}>{type.term}</MenuItem>)}
         </Select>*/}
        <Select
    style={{ width: "350px", height: "3.75rem" }}
    id="interest"
    color={"secondary"}
    value={interest}
    onChange={handleChange}
    name="interests"
    disabled={loading}
    inputProps={{
        id: "hey",
    }}
    input={<BootstrapInput />}
>
    {profile.interests
        ? profile.interests.map((interest) => {
        return (
    <MenuItem color="secondary" value={interest}>
        {intl.formatMessage({ id: interest })}
    </MenuItem>
    );
    })
    : null}
</Select>
    </FormControl>
    </div>
    <div className={classes.popupAlert}>
<div>
    <Modal
    open={openAdd}
    onClose={handleCloseAdd}
    disableEnforceFocus={true}
    className={classes.modal}
>
<div className={classes.modalPaper}>
<div className={classes.modalHeader}>
<Icon>
    <CloseIcon
    className={classes.modalIcon}
    onClick={handleCloseAdd}
        />
        </Icon>
        </div>
        <div className={classes.modalBody}>
    {searchLength ? (
    <div>
    {searchStatus ? (
    <div className={classes.progressStatus}>
    <CircularProgress />
    <Typography variant={"h6"}>
        Medical records fetching from health network
        is in progress
        </Typography>
        </div>
    ) : (
    <div></div>
    )}
    <div>
    <div
        style={{ display: "flex", flexWrap: "wrap" }}
    >
        {manualsearchterms.length == 0
            ? ""
            : manualsearchterms.search_terms.terms.map(
            (item, index) => (
        <React.Fragment>
        <div style={{ width: "20%" }}>
        <FormControlLabel
            className={
                item.selected
                ? classes.modalCheckBoxActive
                : classes.modalCheckBoxInActive
        }
            control={
                <Checkbox
            name={item.term}
            checked={
                checkedFhirItems[
                    item.term
                ]
            }
            onChange={
                handleChangeFhirCondition
            }
            icon={<span />}
            checkedIcon={<span />}
        />
        }
            label={item.term}
        />
        </div>
        </React.Fragment>
        )
        )}
    </div>

    <div
        style={{
        textAlign: "center",
            padding: "25px",
    }}
    >
    <Button
        type={"button"}
        variant="contained"
        color="primary"
        className={classes.addNotesButton}
        onClick={() => add()}
    >
    <Typography variant={"button"}>
        {" "}
        OK{" "}
    </Typography>
    </Button>
    <Button
        type={"button"}
        variant="outlined"
        color="primary"
        className={classes.cancelAddNotesButton}
        onClick={handleCloseAdd}
            >
            <Typography variant={"button"}>
        {" "}
        Cancel{" "}
    </Typography>
    </Button>
    </div>
    </div>
    </div>
    ) : (
    <div>No Results Found</div>
    )}
</div>
    </div>
    </Modal>
    </div>
    </div>

    <Button
    variant="contained"
    color="secondary"
    className={classes.popupButton}
    onClick={() => addDetails()}
>
<Typography variant={"button"}>
        {" "}
    Select Conditions{" "}
</Typography>
    </Button>
    <Typography style={{ margin: "30px 20px 0 0" }}>
    {" "}
    OR{" "}
</Typography>

    <div
    className={classes.diagnosisontainer}
    style={{ float: "left" }}
>
<FormControl variant="filled" id="freetext">
        <Autocomplete
    id="freetext"
    color={"secondary"}
    name="freetext"
    onChange={(e, v) => handleChangeFreeText(v)}
    onKeyPress={(e) => handleKeyPress(e)}
    options={interestList}
    freeSolo
    getOptionLabel={(option) => option}
    renderInput={(params) => (
    <TextField
    style={{
        width: "350px",
            height: "4.2rem", //email correction 7. replacing 3.75rem wih 4.2rem
            marginTop: "2px", //email correction 7. replacing 10px wih 2px
            background: "#fff",
    }}
    {...params}
    inputStyle={{ textAlign: "center" }}
    placeholder="search for health interests"
    variant="outlined"
        />
)}
/>
</FormControl>
    </div>
    </div>
    </div>
    </div>

    <div className={classes.sort}>
<FormControl component="fieldset">
        <RadioGroup
    aria-label="sort by"
    name="sort1"
    value={sort}
    onChange={handleChangeSort}
    row
    >
    <FormControlLabel
    control={
        <Typography style={{ color: "#000", fontSize: "24px" }} />
}
    label="Sort by"
        />
        <FormControlLabel
    value="relevance"
    control={<Radio selected />}
    className={classes.selectedSort}
    label="Relevance"
        />
        <FormControlLabel
    value="recency"
    control={<Radio />}
    className={classes.selectedSort}
    label="Recency"
        />
        </RadioGroup>
        </FormControl>
        </div>
        </div>
        <div className={classes.trialsContainer}>
<div className={classes.container}>
    {!loading && fullList.length === 0 ? (
    <div className={classes.noDiagContainer}>
    <div className={classes.noDiagBox}>
    <img
        src={"/error-icons/image_diagnosis-articles.png"}
        className={classes.connectImage}
        alt="connect network"
            />
            <Typography variant="h3" className={classes.connectText}>
        {searched
            ? "Unable to find any articles for the search term entered. Please try something else."
            : "Enter a term into the field above to search through our database of relevant articles"}
    </Typography>
    </div>
    </div>
    ) : errors.message === "Unable to load articles" ? (
    <NoConnectionError />
    ) : loading ? (
    <div className={classes.loadingCircle}>
    <CircularProgress size={150} />
        </div>
    ) : (
    <>
    <ErrorMessage errors={errors} handleClose={handleCloseError} />
        <Grid
        container
        direction={"row"}
        style={{ marginTop: "32px", paddingBottom: "100px" }}
    >
        {/* <Grid item xs={'2'} className={classes.filtersContainer}>
         <div className={classes.filters}>
         <Typography variant={'h5'} className={classes.filterTitle}>
         Filter Results
         </Typography>
         <Typography variant={'subtitle1'}>
         Sort By
         </Typography>
         <FormControl component="fieldset" className={classes.radios}>
         <RadioGroup aria-label="gender" name="gender1" value={sort} onChange={handleChangeSort }>
         <FormControlLabel value="relevant" control={<Radio />} label="Relevant" />
         <FormControlLabel value="recent" control={<Radio />} label="Recent" />
         <FormControlLabel value="popular" control={<Radio />} label="Popular" />
         </RadioGroup>
         </FormControl>
         </div>
         </Grid>*/}

    <Grid item xs={12} className={classes.resultsContainer}>
    <div className={classes.listHeader}>
        {fullList.length > 0 ? (
        <Typography
            component={"h1"}
            variant={"h5"}
            className={classes.resultTitle}
        >
            {/* email corrections: 5.   */}
            {/* {fullList.length} Results */}
        </Typography>
        ) : null}
        {fullList.length > 0 ? (
        <Typography component={"h1"} variant={"body1"}>
            Showing 1-
        {offset * 10 < fullList.length
            ? offset * 10
            : fullList.length}
        </Typography>
        ) : null}
    </div>
    <div className={classes.trialList}>
        {trials.map((trial) => renderTrial(trial))}
        {offset * 10 < fullList.length ? (
        <Button
            color="primary"
            variant="outlined"
            onClick={handleLoadMore}
            fullWidth
            startIcon={
                <ExpandMoreIcon className={classes.icon} />
        }
            className={classes.loadButton}
        >
            Load More Articles
        </Button>
        ) : null}
    </div>

    <div className={classes.trialButtons}>
    <Button
        type={"button"}
        variant="contained"
        className={classes.PaginationButton}
        color="primary"
        disabled={disablebtn}
        onClick={() => getPrevRecord()}
    >
    <Typography variant={"button"}> Previous </Typography>
        </Button>

        <Button
        type={"button"}
        variant="contained"
        className={classes.PaginationButton}
        color="primary"
        onClick={() => getNextRecord()}
    >
    <Typography variant={"button"}> Next </Typography>
        </Button>
        </div>
        </Grid>
        </Grid>
        </>
    )}
</div>
    </div>
    </Paper>
    </Page>
);
};

export default injectIntl(TreatmentInformation);