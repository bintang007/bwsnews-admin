import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {csrfToken} from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = ({csrfToken}) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {

    }

    const handleClickShowPassword = e => {
        console.log(e)
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = e => {
        console.log(e)
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Masuk
                </Typography>
                <form method={"post"} action={"/api/auth/callback/credentials"} className={classes.form}>
                    <input name={"csrfToken"} type={"hidden"} defaultValue={csrfToken}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.currentTarget.value)}
                    />
                    <FormControl className={clsx(classes.textField)} variant="outlined" fullWidth margin={"normal"}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            name={"password"}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Ingat saya"
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        type={"submit"}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Masuk
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#">
                                Lupa Password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register">
                                {"Belum punya akun? Daftar"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

SignIn.getInitialProps = async ctx => {
    return{
        csrfToken: await csrfToken(ctx)
    }
}

export default SignIn