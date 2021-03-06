import React from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import {
    InputBase,
    Button,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    grow: {
        //  flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: theme.spacing(2, 0),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(3),
        //     width: 'auto',
        // },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: "240px",
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

export default function BlockSF(props) {
    const {handleSearchCountryBy, error, setError} = props;
    const classes = useStyles();
    const [searchVal, setSearchVal] = React.useState('');

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value);
        // console.log("submit: ", searchVal);
    };

    const handleKeyEnterPress = (event) => {
        if (event.key === "Enter") handleSearchCountryBy("name", searchVal);
        // console.log("code: ", event.code);
        // console.log("key: ", event.key);
    };

    return (

      <div className={classes.search}>
          <div className={classes.searchIcon}>
              <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            type={'search'}
            inputProps={{'aria-label': 'search', pattern: "^[a-zA-Z]+$"}}
            onChange={event => handleSearchChange(event)}
            onKeyPress={event => handleKeyEnterPress(event)}
            // TODO: реализовать метод для ошибок
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