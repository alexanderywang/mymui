import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

export function PreviewGeneral() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant='h5'>This is A Paper Component</Typography>
              <br />
              <Typography variant='body1'>
                Reparo incarcerous ennervate stupefy bulbadox aparecium
                alohomora. Stupefy totalus anapneo immobulus cruciatus scourgify
                morsmordre alohomora. Funnunculus inflamarae immobilus lumos
                locomotor funnunculus aparecium. Impedimenta totalus reducto
                rictusempra amortentia nox.
              </Typography>
              <br />
              <Grid item className={classes.button}>
                <Button
                  color='primary'
                  variant='contained'
                  className={classes.button}
                >
                  Primary Color
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  className={classes.button}
                >
                  Secondary Color
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
