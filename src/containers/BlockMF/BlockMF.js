import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from "@material-ui/core/ListSubheader";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '35%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2, 0, 2, 2),
        border: "5px solid transparent",
        borderRadius: "5px",
        height: "fit-content",
    },
}));

export default function BlockMF(props) {
    const {countries, handleUpdateStateFromSStorage, handleShowCountryInf} = props;
    const classes = useStyles();

    const handleDeleteFromFavorites = (country) => {
        sessionStorage.removeItem(country.alpha3Code);
        handleUpdateStateFromSStorage();
    };

    const listOfCounties = (
      countries
        ? countries.map((value, index) => {

            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={index} role={undefined} dense button
                        onClick={() => handleShowCountryInf(value.alpha3Code)}
              >
                  <ListItemText id={labelId} primary={index +1 + " " + value.name}/>
                  <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete from favorites"
                        onClick={() => handleDeleteFromFavorites(value)}
                      >
                          <DeleteForeverIcon/>
                      </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
            );
        })
        : null
    );

    return (
      <Fragment>
          <List
            className={classes.root}
            subheader={
                <ListSubheader className={classes.ListSubheader} color="inherit">
                    My Favorites
                </ListSubheader>
            }
          >
              {listOfCounties}
          </List>
      </Fragment>
    );
}
