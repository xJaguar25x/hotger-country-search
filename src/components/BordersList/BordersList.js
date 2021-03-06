import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexFlow: "row wrap",
        padding: "0",
        // height: "20px",
        // lineHeight: "20px",
        margin: 0,
    },
    listItem: {
        width: "fit-content",
        height: "20px",
        padding: theme.spacing(0, 0.5),
    },
    ListSubheader: {
        height: "20px",
        lineHeight: "20px",
        margin: 0,
        padding: theme.spacing(0),
    },
}));

export default function BordersList(props) {
    const {countryInf, handleSearchCountryBy,handleShowCountryInf} = props;
    // TODO: разобраться почему не работает функция handleSearchCountryBy(), она пробрасывается из App - BlockCI - сюда
    const classes = useStyles();


    const lengthBorders = countryInf.borders;

    const showCountry = (alfa3Code) => {
        /*//Не работает, потому как выдает объект, а если искать через .../name/... то выдает массив
         handleSearchCountryBy("alpha", alfa3Code);*/
        handleShowCountryInf(alfa3Code);
        console.log("click", alfa3Code);
    };

// TODO: доделать список границ, при нажатии должно показывать страну
    const render = (
      <List
        dense
        className={classes.root}
        subheader={
            <ListSubheader className={classes.ListSubheader}>
                borders:
            </ListSubheader>
        }
      >
          {countryInf.hasOwnProperty('borders')
            ? countryInf.borders.map((value) => {
                const labelId = `list-item-${value}`;
                return (
                  <ListItem key={value} button className={classes.listItem}>
                      <ListItemText id={labelId} primary={value} onClick={() => showCountry(value)}/>
                  </ListItem>
                );
            })
            : null}
      </List>
    );

    return (
      <Fragment>
          {lengthBorders && lengthBorders.length > 0 ? render : null}
      </Fragment>
    )
}
