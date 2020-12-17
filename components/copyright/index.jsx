import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = (props) => (
    <div {...props}>
        <Typography variant="body2" color={"inherit"}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                BWS News - Portal Berita Lokal Pemerintahan Kabupaten Bondowoso
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </div>

)

export default Copyright