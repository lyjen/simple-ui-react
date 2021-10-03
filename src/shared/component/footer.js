import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { makeStyles } from "@mui/styles";

export const Footer = () => {

  return (
    <Typography variant="body2"  align="center" style={{marginTop:'20px'}}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.lyjendary.com/">
        dummyApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
