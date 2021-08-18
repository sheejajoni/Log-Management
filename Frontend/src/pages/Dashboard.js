import React from 'react';
 
function Dashboard(props) {
  const user = getUser();
const [message, setMessage] = useState();
 
  // handle click event of logout button
  const handleLogout = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/stream/logout', { username: username.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
alert("user logged out");
      props.history.push('/signin');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

const updateMessage = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/stream/message', { message: message }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
alert("Message deleted");
      
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

const deleteMessage = () => {
    setError(null);
    setLoading(true);
    axios.delete('http://localhost:4000/stream/message').then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
alert("Message deleted");
      props.history.push('/signin');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div>
      Welcome {username}!<br /><br />
	<Typography component="h1" variant="subtitle2" >
            Type your message:
            </Typography>
        
            </div>
            <TextField
           onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="message"
        autoComplete="name"
        error={errors.name && touched.name}        
    />
<div className={classes.buttonContainer}>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={updateMessage}
            >
            
            <Typography variant={"button"} className={classes.buttonText}>
        UPDATE YOUR MESSAGE
        </Typography>
        </Button>

        <Button
        type="button"
        fullWidth
        variant="outlined"
        className={classes.delete}
        disabled={isSubmitting}
       onClick={deleteMessage}
    >
        {/*<DeleteIcon className={classes.buttonIcon}/>*/}
    <Typography variant={"button"} className={classes.buttonText}>
        DELETE YOUR MESSAGE
        </Typography>
        </Button>
        </div>

      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;
