import React, {useEffect, useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import{
    Typography,
    Button,
} from '@material-ui/core/'
import Skeleton from '@material-ui/lab/Skeleton';
import {useHistory} from 'react-router-dom'
import axios from '../../utils/axios'
import { UserContext } from '../../context/user-context'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
        root: {
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: theme.spacing(5),
        },
        imageContainer: {
            backgroundColor: theme.palette.secondary.contrastText,
            flex: '0 0 auto',
            height: '200px',
            width: '200px',
            padding: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        textContainer: {
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(0),
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            color: theme.palette.grey.darkest,
            fontSize:'18px',
            marginBottom:'20px',
            fontFamily:'Gilroy-SemiBold',
            letterSpacing:'1.4px'
        },
        bodyText: {
            height: '125px',
            width: '100%',
            overflow: 'auto',
            fontSize:'16px',
            color:theme.palette.grey.darkest,
            letterSpacing:'1.4px'
        },
        image: {
            height: '100%',
            width: '100%'
        },
        learnButton: {
            width: '180px',
            background:theme.palette.primary.main,
            fontFamily: 'Gilroy-SemiBold',
            textTransform:'uppercase',
            boxShadow:'none',
            color:'#fff'

        }
    }))

const Article = ({id, title, count, searchScore, sortterm, content, searchterm, imageurl, summary}) => {
    const classes = useStyles();
    const history = useHistory()
    const [, dispatch] =useContext(UserContext)
    const [article, setArticle] = useState(false)
    const [search, setSearch] = useState(false)


    const imageURL = '/health/health' + count + '.png'
    const searchString = searchterm.split('-').join('+')

    const bodycont = {
        "page": "1",
        "page_size": "3",
        "published_after": "1901-01-01",
        "query": searchString,
        "sort_mode": sortterm
    }

    useEffect(() => {
        //setArticle(false)
    if (id) {
       const source = axios.CancelToken.source()

        axios.post(process.env.REACT_APP_ONGEV_API_BASEURL + '/api/' + process.env.REACT_APP_ONGEV_API_VERSION + '/sound-board/article', bodycont,
            {
                'headers': { 'Authorization': `Bearer ${localStorage.getItem("AUTH_TOKEN")}` },
                cancelToken: source.token,
            })
            .then((response) => {
            for(let i =0;i<response.data.articles.length;i++) {
            if(response.data.articles[i].id===id){
                const result = response.data.articles[i]
                setArticle(result)
                setSearch(searchterm)
            }
        }



        })
    .catch((error) => {
            if (error.response && error.response.data === 'Token is expired') {
            console.log('Token is expired')
            dispatch(({type: 'token expired'}))
            history.push("/signin", {ongevRoute: "/content/information"})
        }
        console.log('Error ', error)
    })
        return () => {
            source.cancel()
        }
    }
}, [id, dispatch, history])



    if (id) {
        return (
                <div>
            <Typography  className={classes.title}>
        {title}
    </Typography>

            <div className={classes.root}>

        <div className={classes.imageContainer}>
         <img src={imageurl.secure_url} className={classes.image} alt={title}/>
         </div>

    <div className={classes.textContainer}>


         <Typography variant='body1' className={classes.bodyText}>
         {summary}
         </Typography>


        <Button
        disabled={!article}
        variant='contained'
        color="primary"
        className={classes.learnButton}
        onClick={() => history.push("/content/information", {article: article, searchterm: search, previous: 'dashboard'})}>
    <Typography variant={"button"}> Read More </Typography>
        </Button>
        </div>
        </div>
            </div>

    )
    } else {
        return (
            <Skeleton width={'100%'} className={classes.root} height={'100px'} animation={'pulse'} />
    )
    }

}

export default Article