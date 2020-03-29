import React, { useState, useEffect, useCallback, useContext } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { fc } from '../config/firebase';
import 'firebase/functions';
import { Grid, Button, TextField } from '@material-ui/core';

const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

// add admin cloud function

function onAuthStateChange(callback) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true, email: user.email });
    } else {
      callback({ loggedIn: false });
    }
  });
}

export function Auth(props) {
  const [email, setEmail] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    // get email
    const adminEmail = 'tues@fs.com';
    const addAdminRole = fc.httpsCallable('addAdminRole');
    console.log('in auth handleSubmit');
    addAdminRole({ email: adminEmail })
      .then(result => {
        console.log(result);
      })
      .catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log('err in auth', error);
        // ...
      });
  };

  console.log('user in auth', props.user);
  return (
    <div>
      <Grid container direction="column" style={{ marginTop: '10em' }}>
        <Grid item container justify="center">
          <form
            onSubmit={handleSubmit}
            // class="center-align admin-actions"
            style={{ margin: '40px auto; max-width: 300px' }}
          >
            <input
              type="email"
              placeholder="User email"
              id="admin-email"
              required
            />
            <button className="btn-small yellow darken-2 z-depth-0">
              Make admin
            </button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
