import React, {Fragment} from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Zoom from "@material-ui/core/Zoom/Zoom";
import Slide from "@material-ui/core/Slide";
import Collapse from "@material-ui/core/Collapse";

export default function BlockSR(props) {
    const {results, handleBtnShowMore} = props;
    return (
      <Fragment>
      {/*<Collapse in={results.constructor === Array} timeout={{enter: "500ms", exit: "500ms",}} collapsedHeight={40}>*/}
      <List dense={true}>
          {results.constructor === Array ? // проверка на существование массива
            results.map((item, index) => (
             <Fragment>
                 <Slide direction="up" in={!!item} mountOnEnter  unmountOnExit>
              <ListItem key={item.name + index}>

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
              </Slide>

             </Fragment>
            ))
            : null
          }
      </List>
      {/*</Collapse>*/}
      </Fragment>
    );
};