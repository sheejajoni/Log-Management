import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import {
    Grid,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import axios from "../../utils/axios";
import Article from "./Article";

const useStyles = makeStyles((theme) => ({
        trialMatches: {
            flexDirection: "row",
            justify: "center",
            alignItems: "center",
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(20),
        },
        matchesLeft: {
            backgroundColor: theme.palette.tertiary.main,
            paddingLeft: "6%",
            height: "85rem",

            color: theme.palette.secondary.contrastText,
            [theme.breakpoints.down("xs")]: {
                height: "40rem",
            },
        },
        numMatches: {
            fontSize: "128px",
            fontWeight: 100,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.only("sm")]: {
                fontSize: "100px",
            },
        },

        loadingSpinner: {
            color: theme.palette.secondary.contrastText,
        },

        title: {
            color: theme.palette.grey.darkest,
        },

        dividerLine: {
            width: "80%",
            borderBottomStyle: "solid",
            marginBottom: theme.spacing(2),
        },
        matchesRight: {
            backgroundColor: theme.palette.secondary.pale,
            height: "85rem",
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(5),
        },
        matchesRightTop: {
            marginTop: theme.spacing(5),
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(4),
        },
        matchesRightDisabled: {
            backgroundColor: theme.palette.error.main,
            minHeight: "61.25rem",
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            opacity: 0.2,
        },
        matchedArticalesContainer: {
            height: "60%",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(8),
            width: "100%",
        },
        connectImage: {
            width: "90%",
            marginTop: "-6.25rem",
            marginLeft: "-6%",
            [theme.breakpoints.down("xs")]: {
                width: "70%",
                marginLeft: "10%",
            },
        },
        selector: {
            marginLeft: theme.spacing(4),
            width: theme.spacing(30),
        },
        sort :{
            marginBottom:'20px',
            paddingLeft:theme.spacing(2),
            width:'100%'
        },
        selectedSort: {
            color: theme.palette.grey.dark,
        },
        select: {
            color: theme.palette.grey.dark,
            backgroundColor: theme.palette.secondary.contrastText,
            paddingTop: theme.spacing(1.5),
            paddingBottom: theme.spacing(1),
        },
        countText: {
            fontSize: "24px",
            fontWeight: 300,
            width: "85%",
        },
        selectIcon: {},
    }));

const ArticleMatches = ({ profile }) => {
    const classes = useStyles();
    const history = useHistory();
    const intl = useIntl();
    const [loading, setLoading] = useState(true);
    const [numMatches, setNumMatches] = useState(0);
    const [articles, setArticles] = useState([]);
    const [error] = useState(false);

    //jira 444 & 484
    const contentSearch = localStorage.getItem("contentSearch");
    const [search, setSearch] = useState(contentSearch?contentSearch:profile.interests[0]); //changes made  for jira 444 & 484

    //jira 444 & 484
    const contentSort =  localStorage.getItem("contentSort");
    const [sort, setSort] = useState(contentSort?contentSort:"relevance");

    console.log("profile.interests",profile.interests);

    const renderArticle = (match, i) => {
        return (
            <Article
        id={match.id}
        key={match.id ? match.id : match.number}
        title={match.title}
        count={i + 1}
        searchScore={match.score}
        content={match.content}
        searchterm={search}
        sortterm={sort}
        imageurl={match.image_small}
        summary={match.description}
    />
    );
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        //jira 444
        localStorage.setItem("contentSearch", e.target.value);
    };

    const handleChangeSort = (event) => {
        setSort(event.target.value);
        //jira 484
        localStorage.setItem("contentSort", event.target.value);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
    const searchString = search.split("-").join("+");
    setLoading(true);

    const bodycont = {
        page: "1",
        page_size: "3",
        published_after: "1901-01-01",
        query: searchString,
        sort_mode: sort,
    };

    setArticles([
        { number: 1, id: false },
        { number: 2, id: false },
        { number: 3, id: false },
    ]);
    const url =
        process.env.REACT_APP_ONGEV_API_BASEURL +
        "/api/" +
        process.env.REACT_APP_ONGEV_API_VERSION +
        "/sound-board/article";

    axios
        .post(url, bodycont, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            },
            cancelToken: source.token,
        })
        .then((response) => {
        const results = response.data.articles;
    let articleArray = [];
    //Object.keys(results).forEach((category, index) => {
    //articleArray = articleArray.concat(results[category].filter(result => result.objectType === 'Article'))
    articleArray = results;

    ///})
    //articleArray.sort((a, b) => b.score - a.score)
    setNumMatches(articleArray.length);
    setArticles(articleArray);
    setLoading(false);
})
.catch((err) => {
        console.log(err);
    setLoading(false);
});

    return () => {
        source.cancel();
    };
}, [search, sort]);

    return (
        <Grid container direction={"row"} className={classes.trialMatches}>
<Grid item sm={4} xs={12} className={classes.matchesLeft}>
<img
    src={"/error-icons/image_diagnosis-articles.png"}
    className={classes.connectImage}
    alt="connect network"
        />
        <br></br>
        <br></br>
        <Typography
    component={"h1"}
    variant={"h1"}
    className={classes.numMatches}
>
    {/* email correction:- 1. replacing numMatches to "30+" */}
    {!loading ? (numMatches < 100 ? "30+" : "99+") : "-"}
</Typography>
    <div className={classes.dividerLine} />
<Typography variant={"h5"} className={classes.countText}>
    Articles Related to{" "}
<span style={{ fontWeight: 700 }}>
    {intl.formatMessage({ id: search })}
</span>
    </Typography>
    </Grid>

    <Grid
    item
    sm={8}
    xs={12}
    className={error ? classes.matchesRightDisabled : classes.matchesRight}
        >
        <div className={classes.matchesRightTop}>
<Typography variant="h2" className={classes.title}>
    Content For You
    </Typography>
    <FormControl
    variant="outlined"
    id="interests"
    className={classes.selector}
>
<Select
    id="interest"
    color={"secondary"}
    value={search}
    onChange={handleChange}
    name="interests"
    disabled={loading}
    inputProps={{
        classes: {
            root: classes.select,
        },
    }}
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

    {/*<FormControl variant="outlined" id='interests' className={classes.selector}>
     <Select
     id="sort"

     name='sort'
     inputProps={{
     classes: {
     root: classes.select,
     }
     }}
     fullWidth
     >
     <MenuItem value="">
     <em>None</em>
     </MenuItem>
     <MenuItem value={'relevance'}>Relevance</MenuItem>
     <MenuItem value={'recency'}>Recency</MenuItem>
     <MenuItem value={'mixed'}>Mixedr</MenuItem>
     </Select>
     </FormControl>*/}
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
    control={<Typography style={{ fontSize: "24px" }} />}
    label="Sort by"
        />
        <FormControlLabel
    value="relevance"
    control={<Radio defaultChecked />}
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

        <div></div>

        <div className={classes.matchedArticlesContainer}>
    {articles.map((article, i) => renderArticle(article, i))}
</div>
    <Button
    type={"button"}
    className={classes.matchesButton}
    variant={"outlined"}
    color={"secondary"}
    fullWidth
    onClick={() =>
    history.push("/content/information", {
        search: intl.formatMessage({ id: search }),
    })
}
>
<Typography variant={"button"}>VIEW ALL CONTENT MATCHES </Typography>
    </Button>
    </Grid>
    </Grid>
);
};

export default ArticleMatches;