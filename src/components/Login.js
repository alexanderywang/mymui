import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase';
import 'firebase/auth';
import { db } from '../config/firebase';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  IconButton,
  Typography,
  Paper
} from '@material-ui/core/';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: '20px',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    fontWeight: 400,
    textTransform: 'none',
    borderRadius: 5,
    height: 46,
    padding: 10,
    alignItems: 'center'
  },
  title: { backgroundColor: '#3d4576' },
  tab: {
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '1rem',
    minWidth: 10,
    marginLeft: '25px',
    color: '#000',
    fontFamily: 'Roboto'
  },
  errorText: {
    color: '#f50057',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 14
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
    backgroundColor: '#fff'
  }
}));

export function Login(provider) {
  var provider = new firebase.auth.GoogleAuthProvider();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');

  const handleMaxWidthChange = event => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = event => {
    setFullWidth(event.target.checked);
  };

  const handleClick = () => {
    setOpenSnack(true);
    setEmail();
    setPassword();
  };
  const handleClose = (event, reason) => {
    console.log('hanCl');
    if (reason === 'clickaway' || reason === 'timeout') {
      setOpenSnack(false);
      handleClick();
      return;
    }

    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = e => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred.user);
        setData(cred.user);
      })
      .catch(function(error) {
        if (!isEmpty(error)) {
          handleClick();
        }
        console.log('error in login', error);
      });
  };

  const validate = email => {
    let errors = {};
    if (!email) {
      errors = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors = 'Email address is invalid';
    }
    return errors;
  };
  const isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  return (
    <div>
      <Tab label="Login" className={classes.tab} onClick={handleClickOpen}>
        Login
      </Tab>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        style={{ backgroundColor: '#fff' }}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <Paper
        // className={classes.paper}
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   margin: 'auto',
        //   width: 'fit-content',
        //   backgroundColor: '#fff'
        // }}
        >
          <Typography
            id="form-dialog-title"
            align="center"
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Roboto',
              lineHeight: 3
            }}
            className={classes.title}
          >
            LOG IN
          </Typography>
          <DialogContent className={classes.paper}>
            <TextField
              label="Email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!isEmpty(validate(email)) && email.length > 0}
              helperText={
                validate(email) && email.length > 0
                  ? 'Please enter a valid email'
                  : ''
              }
              helperText={
                !isEmpty(validate(email)) && email.length > 0
                  ? validate(email)
                  : ''
              }
            />
          </DialogContent>
          <DialogContent className={classes.paper}>
            <TextField
              type="password"
              label="Password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </DialogContent>
          {openSnack && (
            <Typography component="p" className={classes.errorText}>
              Incorrect email or password
            </Typography>
          )}
          <DialogActions>
            <Button
              onClick={handleSubmit}
              style={{
                fontFamily: 'Roboto',
                fontSize: 14,
                marginRight: '20px',
                color: '#3F51B5'
              }}
              className={classes.button}
            >
              Login
            </Button>

            <button
              onClick={() => {
                firebase
                  .auth()
                  .signInWithPopup(provider)
                  .then(function(result) {
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log('google user', user);
                    // db.collection('Users')
                    //   .doc(user.uid)
                    //   // .set({ email: user.email.value });
                    //   .set({
                    //     firstName: 'goog',
                    //     lastName: 'le',
                    //     email: user.email,
                    //     password: '111111',
                    //     username: 'googleAuth'
                    //   });
                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    console.log('google error', error);
                  });
              }}
              className="googleBtn"
              type="button"
              style={{ fontSize: 14, marginRight: '20px' }}
            >
              <img
                style={{ fontSize: 14, width: '12px', marginRight: '5px' }}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
              Login With Google
            </button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}

export default Login;
