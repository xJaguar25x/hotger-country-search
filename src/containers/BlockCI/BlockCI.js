import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {BordersList} from "../../components/index";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    header: {
        // title: {
        //     "font-size": "1.2rem",
        // },
        height: 50,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

export default function BlockCI(props) {
    const classes = useStyles();
    const {countryInf, handleUpdateStateFromSStorage} = props;

    const handleAddFavorites = () => {
        sessionStorage.setItem(countryInf.alpha3Code, JSON.stringify(countryInf));
        handleUpdateStateFromSStorage();
    };
    const handleDeleteFromFavorites = () => {
        sessionStorage.removeItem(countryInf.alpha3Code);
        handleUpdateStateFromSStorage();
    };

    const returnBtn = () => {
        let keys = Object.keys(sessionStorage);
        console.log("keys", keys);
        console.log("keys find", keys.includes("NRU"));

        if (!keys.includes(countryInf.alpha3Code)) {
            return (
              <IconButton
                aria-label="add to favorites"
                label="add to favorites"
                onClick={() => handleAddFavorites()}
              >
                  <FavoriteBorderIcon/>
              </IconButton>
            )
        } else return (
          <IconButton
            aria-label="delete from favorites"
            onClick={() => handleDeleteFromFavorites()}
            color="primary"
          >
              <FavoriteIcon/>
          </IconButton>
        )
    };

    return (
      <Fragment>
          {console.log("countryInf", countryInf)}
          {countryInf !== null
            ?
            <Card className={classes.root}>
                <CardHeader
                  className={classes.header}
                  action={
                      returnBtn()
                  }
                  title={countryInf.name}
                />
                <CardMedia
                  className={classes.media}
                  image={countryInf.flag}
                  title={countryInf.name + " flag"}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        alpha3Code: {countryInf.alpha3Code}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {countryInf.hasOwnProperty('languages') ?
                          countryInf.languages.map((item, index) => {
                              if (index === 0 && countryInf.languages.length === 1) {
                                  return "langs: " + item.name + "."
                              } else if (index === 0) {
                                  return "langs: " + item.name
                              } else if (index === countryInf.languages.length - 1) {
                                  return ", " + item.name + "."
                              } else {
                                  return ", " + item.name
                              }
                          })
                          : null}
                    </Typography>
                    <BordersList
                      countryInf={countryInf}
                      handleSearchCountryBy={props.handleSearchCountryBy}
                      handleShowCountryInf={props.handleShowCountryInf}
                    />
                </CardContent>
            </Card>

            : null
          }
      </Fragment>
    );
}