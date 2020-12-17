import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {DataGrid, RowProps, ColDef, AddIcon} from "@material-ui/data-grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "../components/appbar";
import {Container} from "@material-ui/core";
import {
    randomCreatedDate,
    randomUpdatedDate,
    randomCompanyName,
    randomUrl,
    randomId
} from "@material-ui/x-grid-data-generator";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import {Delete, PlusOne} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import {func} from "prop-types";
import CreateFeedDialog from "../components/createfeeddialog";
import Backdrop from "@material-ui/core/Backdrop";
import Router from "next/router";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    paper: {
        boxSizing: 'border-box',
        '& > *': {
            width: '100%',
            height: theme.spacing(70),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    dataGrid: {}
}))

const sortModel = [
    {
        field: 'name',
        sort: 'asc'
    }
]

const Feed = ({authenticated, session}) => {
    const classes = useStyles();
    const [editable, setEditable] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const [selection, setSelection] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [feed, setFeed] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        console.log(session)
    }, [session])

    useEffect(() => {
        if (selection.length === 1) {
            setEditable(true)
            setDeletable(true)
        } else if (selection.length > 1) {
            setEditable(false)
        } else {
            setEditable(false)
            setDeletable(false)
        }
    }, [selection])

    const handleDeleteItem = () => {

        setRows(rows.filter(function ({id}) {
            return this.indexOf(id) < 0
        }, selection))

    }

    const handleEditItem = () => {

    }

    const handleDialogClose = value => {
        setDialogOpen(value)
    }

    const handleDialogOpen = _ => {
        setDialogOpen(true)
    }

    useEffect(() => {
        fetch('http://localhost:3001/feed')
            .then(res => res.json())
            .then(json => {
                setFeed(json)
            })
    }, [refresh])

    const handleSubmit = (name, url) => {
        console.log(name)
        if (name && url) {
            // alert('oke')
            setLoading(true)
            fetch('http://localhost:3001/feed', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({name, url})
            }).then(res => res.json())
                .then(json => {
                    if (!json.errors) {
                        setRefresh(!refresh)
                        setDialogOpen(false)
                    }
                    setLoading(false)
                })
        } else {
            // alert('required name and url')
        }
    }


    return (
        <div className={classes.root}>
            <AppBar/>
            <div className={classes.content}>
                <div className={classes.toolbar}/>
                <Container fixed>
                    <div className={classes.paper}>
                        <Paper>
                            <Grid container>
                                <Grid xs={6} item>
                                    <Button variant={"contained"}
                                            color={"primary"}
                                            startIcon={<AddIcon/>}
                                            onClick={handleDialogOpen}>
                                        Tambah
                                    </Button>
                                </Grid>
                                <Grid xs={6} item container justify={"flex-end"}>
                                    <Grid item>
                                        {
                                            editable && (
                                                <IconButton disabled onClick={handleEditItem}>
                                                    <EditIcon style={{color: green[600]}}/>
                                                </IconButton>
                                            )
                                        }
                                        {
                                            deletable && (
                                                <IconButton  disabled onClick={handleDeleteItem}>
                                                    <Delete style={{color: red[700]}}/>
                                                </IconButton>
                                            )
                                        }


                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*<Box mb={2}/>*/}
                            <DataGrid
                                checkboxSelection
                                pageSize={10}
                                rowsPerPageOptions={[10, 25, 100]}
                                columns={[
                                    {field: 'id', hide: true},
                                    {field: 'name', headerName: 'Nama OPD', width: 150},
                                    {
                                        field: 'url',
                                        headerName: 'URL Feed Situs OPD',
                                        width: 250,
                                        disableClickEventBubbling: true
                                    },
                                    {field: 'createdAt', headerName: 'Dibuat pada', width: 200, type: 'date'},
                                    {field: 'updatedAt', headerName: 'Diubah pada', width: 200, type: 'date'},
                                ]}
                                onSelectionChange={({rowIds}) => setSelection(rowIds)}
                                rows={feed.map(item => {
                                    return {
                                        ...item,
                                        createdAt: new Date(item.createdAt),
                                        updatedAt: new Date(item.updatedAt),
                                        id: item._id
                                    }
                                })}
                                sortModel={sortModel}/>
                        </Paper>
                    </div>
                </Container>
            </div>
            <CreateFeedDialog onRefresh={refresh} onSubmit={handleSubmit} open={dialogOpen} onClose={handleDialogClose}/>
            <Backdrop className={classes.backdrop} open={loading}/>
        </div>
    )
}

export default Feed