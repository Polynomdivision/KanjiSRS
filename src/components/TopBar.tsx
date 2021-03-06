import * as React from "react";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/Typography";
import SwipeableDrawer from "material-ui/SwipeableDrawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";

import MenuIcon from "material-ui-icons/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";
import { WithStyles, withStyles } from "material-ui/styles";

import { Link } from "react-router-dom";

// TODO: Move this into the application component
import { getUsername } from "../models/User";

const decorate = withStyles(() => ({
    logoutButton: {
        marginRight: -12,
    },
    flex: {
        flex: 1,
    },
    root: {
        flexGrow: 1,
    }
}));

interface ITopbarState {
    drawerOpen: boolean;
}

interface ITopbarProps {
    isAuth: () => boolean;
    logout: () => void;
}

const DashboardLink = (props: any) => <Link to="/user/dashboard" {...props} />;
const VocabListLink = (props: any) => <Link to="/user/vocab" {...props} />;
type Style = WithStyles<"logoutButton"> & WithStyles<"flex"> & WithStyles<"root">;
const dClass = decorate(
    class Topbar extends React.Component<Style & ITopbarProps, ITopbarState> {
        constructor(props: any) {
            super(props);

            this.state = {
                drawerOpen: false,
            };

            this.openDrawer = this.openDrawer.bind(this);
            this.closeDrawer = this.closeDrawer.bind(this);
        }


        openDrawer() {
            this.setState({
                drawerOpen: true,
            });
        }
        closeDrawer() {
            this.setState({
                drawerOpen: false,
            });
        }

        render() {
            // TODO: Move the Drawer into its own component
            const auth = this.props.isAuth();
            const { classes } = this.props;

            return <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        { auth ?
                          <IconButton
                              aria-label="Menu"
                              onClick={() => this.openDrawer() }
                              style={{
                                  marginRight: 20,
                                  cursor: "pointer",
                              }}
                              >
                              <MenuIcon />
                          </IconButton>
                          : null
                        }
                        <Button component={DashboardLink} className={classes.flex}>
                            <Typography variant="title" color="inherit">
                                Kanji SRS
                            </Typography>
                        </Button>
                        {
                            // Only show the logout button when we're logged in
                            auth ? <Button
                                       className={classes.logoutButton}
                                       onClick={(evt) => this.props.logout()}>
                                Logout
                            </Button> : null
                        }
                    </Toolbar>
                </AppBar>
                { auth ?
                  <SwipeableDrawer
                      anchor="left"
                      open={this.state.drawerOpen}
                      onOpen={this.openDrawer}
                      onClose={this.closeDrawer}
                      >
                      <div
                          tabIndex={0}
                          onClick={this.closeDrawer}
                          onKeyDown={this.closeDrawer}
                          role="button">
                          <List className="DrawerList">
                              <ListItem button>
                                  <Avatar>
                                      <AccountCircle />
                                  </Avatar>
                                  <ListItemText primary={getUsername()} />
                              </ListItem>
                              <ListItem button component={DashboardLink}>
                                  <ListItemText primary="Dashboard" />
                              </ListItem>
                              <Divider />
                              <ListItem button component={VocabListLink}>
                                  <ListItemText primary="Your Vocabulary" />
                              </ListItem>
                          </List>
                      </div>
                  </SwipeableDrawer>
                  : null
                }
            </div>;
        }
    }
);

export default dClass;
