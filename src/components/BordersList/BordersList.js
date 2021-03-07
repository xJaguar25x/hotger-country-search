import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexFlow: "row wrap",
        padding: "0",
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
    const {countryInf, handleShowCountryInf} = props;
    const classes = useStyles();
    const lengthBorders = countryInf.borders;

    const showCountry = (alfa3Code) => {
        handleShowCountryInf(alfa3Code);
    };

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
