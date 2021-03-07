import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {BlockCI, BlockMF, BlockSF, BlockSR} from "../index";
import lightBlue from '@material-ui/core/colors/lightBlue';

const Blue = lightBlue[50];


const useStyles = makeStyles((theme) => ({
    Container: {
        display: 'flex',
        backgroundColor: Blue,
        width: document.documentElement.clientWidth,
    },
    mainBlock: {
        width: "65%",
    },
    body: {
        width: document.documentElement.clientWidth,
    },
}));

export default function App() {
    const classes = useStyles();
    const [results, setResults] = React.useState([]);
    const [countryInf, setCountryInf] = React.useState(null);
    const [error, setError] = React.useState({IsError: false, message: "", status: ''});
    const [favorite_countries, setFavorite_countries] = React.useState();

    const handleSearchCountryBy = (searchBy, value) => {
        //clear state before run new seacrh
        setCountryInf(null);
        setResults([]);
        fetch(`https://restcountries.eu/rest/v2/${searchBy}/${value}`)
          .then(res => res.json())
          .then(
            (result) => {
                handleAfterSearch(result);
            },
            (error) => {
                setError(error);
            }
          )
          .catch(
            (error) => {
                setError(error);
            });

    };
    const handleAfterSearch = (searchRes) => {
        //Условие на вывод 1 или нескольких результатов
        if (searchRes.length === 1) {
            setError(false);
            setCountryInf(searchRes[0]);
        } else if (searchRes.hasOwnProperty("status")) {
            setError(searchRes);
        } else {
            setError(false);
            setResults(searchRes);
        }
    };
    const handleBtnShowMore = (item) => {
        setCountryInf(results[item]);
    };
    const handleShowCountryInf = (alfa3Code) => {
        setCountryInf(null);
        setResults([]);
        fetch(`https://restcountries.eu/rest/v2/alpha/${alfa3Code}`)
          .then(res => res.json())
          .then(
            (result) => { setCountryInf(result);},
            (error) => { setError(error); }
          )
          .catch(
            (error) => { setError(error); })
    };
    const handleUpdateStateFromSStorage = () => {
        let keys = Object.keys(sessionStorage);

        let countriesArr = [];
        for (let key of keys) {
            const country = JSON.parse(sessionStorage.getItem(key));
            countriesArr.push(country);
        }
        setFavorite_countries(countriesArr);
    };
    useEffect(() => {
        handleUpdateStateFromSStorage();
    }, []);

    return (
      <Container maxWidth="sm" className={classes.Container}>
          <div className={classes.mainBlock}>
              {/*Search Form (SF)*/}
              <BlockSF
                handleSearchCountryBy={handleSearchCountryBy}
                error={error}
                setError={setError}
              />
              <div className="mainContent">
                  {/*Main Content (MC)*/}
                  <BlockCI
                    countryInf={countryInf}
                    handleUpdateStateFromSStorage={handleUpdateStateFromSStorage}
                    handleSearchCountryBy={handleSearchCountryBy}
                    handleShowCountryInf={handleShowCountryInf}
                  />
                  {/*Search Results (SR)*/}
                  <BlockSR
                    results={results}
                    handleBtnShowMore={handleBtnShowMore}
                  />
              </div>
          </div>
          {/*My Favorites (MF)**/}
          <BlockMF
            countries={favorite_countries}
            handleUpdateStateFromSStorage={handleUpdateStateFromSStorage}
            handleShowCountryInf={handleShowCountryInf}
          />
      </Container>
    );

};