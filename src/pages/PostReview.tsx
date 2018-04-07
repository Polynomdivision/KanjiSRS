import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Table, { TableHead, TableBody, TableRow, TableCell } from "material-ui/Table";

import { Link } from "react-router-dom";

import { IResult, ResultType, QuestionType } from "../models/Review";

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        height: 400,
    },
}));

interface IPostReviewProps {
    getLastReview: () => IResult[];
}

const dashboardLink = (props: any) => <Link to="/user/dashboard" {...props} />;
const dClass = decorate(
    class PostReview extends React.Component<WithStyles<"paper"> & IPostReviewProps, {}> {
        render() {
            const { classes } = this.props;
            const generateListItem = (function() {
                let id = 0;
                // TODO: Move this into its own component
                return (result: IResult) => {
                    // TODO: The vocabulary should appear white
                    return <TableRow key={id++}>
                        <TableCell>
                            <Typography variant="display1" color="inherit">
                                {result.question.kanji.char}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" color="inherit">
                                {{
                                     [QuestionType.Reading]: "Reading",
                                     [QuestionType.Meaning]: "Meaning",
                                }[result.question.type]}
                            </Typography>
                        </TableCell>
                    </TableRow>;
                };
            })();

            return <div>
                <Grid container justify="center">
                    <Grid item xs lg={4}>
                        <Paper
                            elevation={4}
                            className={classes.paper}
                            style={{ backgroundColor: "#26A65B", color: "white" }}>
                            <Grid container direction="column">
                                <Typography
                                    variant="title"
                                    color="inherit">
                                    Correct Answers
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vocabulary</TableCell>
                                            <TableCell>Task</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { this.props.getLastReview()
                                              .filter((el) => el.type === ResultType.Correct)
                                              .map((el) => generateListItem(el)) }
                                    </TableBody>
                                </Table>
                                <Button
                                    fullWidth={true}
                                    component={dashboardLink}
                                    variant="raised"
                                    color="primary">
                                    Dashboard
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs lg={4}>
                        <Paper
                            elevation={4}
                            className={classes.paper}
                            style={{ backgroundColor: "#f03434", color: "white" }}>
                            <Grid container direction="column">
                                <Typography
                                    variant="title"
                                    color="inherit">
                                    Wrong Answers
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vocabulary</TableCell>
                                            <TableCell>Task</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { this.props.getLastReview()
                                              .filter((el) => el.type === ResultType.Wrong)
                                              .map((el) => generateListItem(el)) }
                                    </TableBody>
                                </Table>
                                <Button
                                    fullWidth={true}
                                    component={dashboardLink}
                                    variant="raised"
                                    color="primary">
                                    Dashboard
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);
export default dClass;
