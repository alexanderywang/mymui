import React, { useState } from "react";
import { db } from "../../config/firebase";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography
} from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "transparent"
    },
    fontWeight: 400,
    textTransform: "none",
    borderRadius: 5,
    height: 46,
    padding: 10
  }
}));

export const SaveTheme = ({ downloadTheme, user }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [themeName, setThemeName] = useState("untitled");
  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
    // not loggedin should send user to signup
    if (!user.uid) {
      alert("you need to signup for an account in order to save");
      history.push("/signup");
    }
  };

  const handleCancel = e => {
    setOpen(false);
  };

  const duplicateNameChecker = async themeName => {
    const checkDuplicate = await db
      .collection("Users")
      .where("themes", "array-contains", `${themeName}`)
      .get()
      .then(querySnapshot => {
        console.log("SaveTheme -> querySnapshot", querySnapshot.empty);
        return !querySnapshot.empty;
      });
    console.log("SaveTheme -> checkDuplicate", checkDuplicate);
    return checkDuplicate;
  };

  const handleSave = async e => {
    setOpen(false);

    //test for duplicate names
    const duplicateTest = await duplicateNameChecker(themeName);
    if (duplicateTest) {
      alert("That name is a popular name. Please choose another name!");
    } else {
      sendPalette(themeName);
      alert("New Customized Theme Saved");
    }
  };

  const addThemeToUser = async (themeName, userId) => {
    await db
      .collection("Users")
      .doc(`${userId}`)
      .update({
        themes: firebase.firestore.FieldValue.arrayUnion(`${themeName}`)
      })
      .then(() => {
        console.log("updated user with reference to theme");
      });
  };

  const sendPalette = async themeName => {
    console.log(downloadTheme);
    downloadTheme.createdAt = new Date();
    downloadTheme.userId = user.uid;
    downloadTheme.themeName = themeName;
    downloadTheme.starsCount = 0;
    let newTheme = await db
      .collection("CustomizedThemes")
      .doc()
      .set({ ...downloadTheme })
      .then(function() {
        console.log(`Added Theme ${themeName} to collection`);
      })
      .catch(function(error) {
        console.log("Error creating a new theme: ", error);
      });
    addThemeToUser(themeName, user.uid);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          fontFamily: "Roboto",
          fontSize: 14,
          marginBottom: "2em",
          color: "#f50057"
        }}
        className={classes.button}
      >
        Save <SaveIcon style={{ marginLeft: "5px" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <Paper style={{ backgroundColor: "#fff" }}>
          <Typography
            id="form-dialog-title"
            align="center"
            style={{
              color: "#000",
              fontSize: 18,
              fontFamily: "Roboto",
              lineHeight: 3
            }}
          >
            YOUR THEME
          </Typography>
          <DialogContent>
            <DialogContentText
              style={{
                color: "#000",
                fontSize: 16,
                fontFamily: "Roboto",
                lineHeight: 3
              }}
            >
              Name your saved theme something quirky
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="themeName"
              type="text"
              value={themeName}
              onChange={e => setThemeName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              style={{
                fontFamily: "Roboto",
                fontSize: 14,
                marginBottom: "2em",
                color: "#f50057"
              }}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              style={{
                fontFamily: "Roboto",
                fontSize: 14,
                marginBottom: "2em",
                color: "#3F51B5"
              }}
              className={classes.button}
            >
              Save
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};
