import React from "react";
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
import Slide from "@material-ui/core/Slide";

export default function BlockSR(props) {
    const {results, handleBtnShowMore} = props;
    return (
      <List dense={true}>
          {results.constructor === Array ?
            results.map((item, index) => (
              <Slide key={item.name + index} direction="up" in={!!item} mountOnEnter unmountOnExit>
                  <ListItem key={item.name + index}>

                      <ListItemAvatar>
                          <Avatar>
                              <img src={item.flag} height="24px" alt={item.name}/>
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
            ))
            : null
          }
      </List>
    );
};