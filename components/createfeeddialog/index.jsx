import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const CreateFeedDialog = props => {
    const {open, onClose} = props
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [errorName, setErrorName] = useState('')
    const [errorURL, setErrorURL] = useState('')
    const [refresh, setRefresh] = useState(false)

    const handleClose = _ => {
        onClose(false)
    }


    useEffect(_=> {
        const handleClear = _ => {
            setName('');
            setUrl('')
        }
        handleClear()
    }, [props.onRefresh])




    // useEffect(_ => {
    //     fetch('http://localhost:3001/feed', {
    //         method: 'post',
    //         body: {
    //             name, url
    //         }
    //     }).then(value => {
    //         if (value.status === 400) {
    //             return value.json()
    //         }
    //     })
    // }, [name, url])


    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Tambah Data Feed</DialogTitle>
            <DialogContent>
                <TextField
                    variant={"outlined"}
                    autoFocus
                    required
                    margin={"dense"}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    id={"name"}
                    label={"Nama OPD"}
                    fullWidth
                    helperText={errorName}/>
                <Box mb={1}/>
                <TextField
                    variant={"outlined"}
                    required
                    value={url}
                    onChange={e => setUrl(e.currentTarget.value)}
                    margin={"dense"}
                    id={"url"}
                    label={"URL Feed"}
                    fullWidth/>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color={"primary"}>
                    Batal
                </Button>
                <Button onClick={_=> props.onSubmit(name, url)} color={"primary"}>
                    Simpan
                </Button>
            </DialogActions>
        </Dialog>
    )
}

CreateFeedDialog.prototype = {}

export default CreateFeedDialog