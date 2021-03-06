import React from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    inputRoot: {
        color: 'inherit',
        // width: "240px",
        width: '27ch',
        marginRight: theme.spacing(1),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function BlockSF2(props) {
    const {handleSearchCountryBy, error, setError} = props;
    const classes = useStyles();
    const [searchVal, setSearchVal] = React.useState('');

    const handleSearchChange = (e) => {
        handleCheckLatin(e);
        // setSearchVal(e.target.value);
        // setError(false);
        console.log("submit: ", searchVal);
    };

    const handleCheckLatin = (event) => {
        // const regexp =/[$\u0400-\u04FF]/ig;
        const regexp = /[$\u0400-\u04FF0-9-]/ig;
        const isCyrilic = regexp.test(event.target.value);
        if (isCyrilic) {
            const data = event.target.value.replace(regexp, '');
            setError({status: true, message: "Only the Latin alphabet is allowed."});
            setSearchVal(data);
        } else {
            setError(false);
            setSearchVal(event.target.value);
        }
    };

    const handleKeyEnterPress = (event) => {
        if (event.key === "Enter") handleSearchCountryBy("name", searchVal);
    };

    return (
      <div className={classes.search}>
          <TextField
            placeholder="Search…"
            classes={{root: classes.inputRoot}}
            type={'search'}
            InputProps={{
                classes: {input: classes.inputInput},
                startAdornment: (
                  <InputAdornment position="start" classes={{
                      root: classes.searchIcon,
                  }}>
                      <SearchIcon/>
                  </InputAdornment>)
            }}
            inputProps={{
                'aria-label': 'search',
                // pattern: "^[a-zA-Z]+$"
            }}
            value={searchVal}
            onChange={event => handleSearchChange(event)}
            onKeyPress={event => handleKeyEnterPress(event)}
            error={!!error.status}
            helperText={error.message}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearchCountryBy("name", searchVal)}
          >
              Search
          </Button>
      </div>
    );
};