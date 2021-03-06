import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {
    Container,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {BlockCI} from "../index";
import BlockMF from "../BlockMF/BlockMF";
import lightBlue from '@material-ui/core/colors/lightBlue';
import BlockSF from "../BlockSF/BlockSF";
import BlockSF2 from "../BlockSF/BlockSF2";

const Blue = lightBlue[50];


const useStyles = makeStyles((theme) => ({
    grow: {
        //  flexGrow: 1,
    },
    Container: {
        display: 'flex',
        backgroundColor: Blue,
    },
    mainBlock: {
        width: "65%",
    }
}));

export default function App() {
    const classes = useStyles();
    const [results, setResults] = React.useState([]);
    const [countryInf, setCountryInf] = React.useState(null);
    const [error, setError] = React.useState({IsError: false, message: "", status: ''});
    // const [isLoaded, setIsLoaded] = React.useState(false); // не используется
    const [favorite_countries, setFavorite_countries] = React.useState();

    const handleSearchCountryBy = (searchBy, value) => {
        //clear state before run new seacrh
        setCountryInf(null);
        setResults([]);
        fetch(`https://restcountries.eu/rest/v2/${searchBy}/${value}`)
          .then(res => res.json())
          .then(
            (result) => {
                // searchRes =result;
                // setResults(result);
                handleAfterSearch(result);
                // result.length === 1 ? setCountryInf(result[0]) : setResults(result);
                console.log("result1: ", result);
                console.log("length1: ", result.length);
                console.log("response.type1: ", result.constructor);
                // console.log("searchRes: ", searchRes);

            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
                setError(error);
                console.log("error: ", error);
            }
          )
          .catch(
            (error) => {
                setError(error);
                console.log("error: ", error);
            });

    };
    const handleAfterSearch = (searchRes) => {
        //Условие на вывод 1 или нескольких результатов
        if (searchRes.length === 1) {
            setError(false);
            setCountryInf(searchRes[0]);
            console.log("searchRes: ", searchRes);
        } else if (searchRes.hasOwnProperty("status")) {
            setError(searchRes);
            console.log("error2: ", searchRes);
        } else {
            setError(false);
            setResults(searchRes);
            console.log("searchRes: ", searchRes);
        }
    };

    const handleBtnShowMore = (item) => {
        setCountryInf(results[item]);
        console.log("item: ", results[item]);
    };
    const handleShowCountryInf = (alfa3Code) => {
        setCountryInf(null);
        setResults([]);
        fetch(`https://restcountries.eu/rest/v2/alpha/${alfa3Code}`)
          .then(res => res.json())
          .then(
            (result) => {
                // setIsLoaded(true);
                setCountryInf(result);
                console.log("result: ", results);
                console.log("response: ", result);
            },
            (error) => {
                setError(error);
                console.log("error: ", error);
            }
          )
          .catch(
            (error) => {
                setError(error);
                console.log("error: ", error);
            })

        // setCountryInf(alfa3Code);
        // console.log("item: ", alfa3Code);
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
        console.log('state=', favorite_countries);
    }, []);

    return (
      <Container maxWidth="sm" className={classes.Container}>
          <div className={classes.mainBlock}>
              {/*Search Form (SF)*/}
              {/* <BlockSF
                handleSearchCountryBy={handleSearchCountryBy}
                error={error}
                setError={setError}
              />*/}
              <BlockSF2
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

                  <div>
                      {/*Search Results (SR)*/}
                      {/*{console.log("result155: ", results)}*/}
                      {/*{console.log("results.isArray({}): ",results.constructor === Array )}*/}
                      <List dense={true}>
                          {results.constructor === Array ? // проверка на существование массива
                            results.map((item, index) => (
                              <ListItem key={index}>
                                  <ListItemAvatar>
                                      <Avatar>
                                          {/*<FolderIcon/>*/}
                                          {/*<IconWrapper img={item.flag}/>*/}
                                          {/*<SvgIcon src={item.flag} viewBox="0 0 600 476.6" />*/}
                                          <img src={item.flag} height="24px" alt={item.name}/>
                                          {/*    TODO: доделать компонент SvgIcon. ТЕкст поиска "svg иконка из урл в material-ui svg icon"
                                      https://stackoverflow.com/questions/38510443/how-to-use-an-svg-file-in-a-svgicon-in-material-ui*/}
                                      </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={item.name}
                                  />
                                  <ListItemSecondaryAction>
                                      <IconButton edge="end" aria-label="delete"
                                                  onClick={() => handleBtnShowMore(index)}>
                                          <VisibilityIcon/>
                                      </IconButton>
                                  </ListItemSecondaryAction>
                              </ListItem>
                            ))
                            : null
                          }
                      </List>
                  </div>
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