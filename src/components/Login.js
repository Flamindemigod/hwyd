import { Button, Dialog, DialogContent, TextField, Snackbar,IconButton,Alert, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const [email, setEmail] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState("")
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const handleLoginEmail = async (e) => {

        try {
          setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            setSnackBarText('Check your email for the login link!');
            handleClick();
            setDialogOpen(false);
        } catch (error) {
            setSnackBarText(error.error_description || error.message);
            handleClick();
        }
        finally{
          setLoading(false)
        }
    }

    const handleLoginGoogle = async (e) => {

      try {
        setLoading(true)
          const { user, session, error } = await supabase.auth.signIn({
            provider: 'google',
          })
          if (error) throw error
          setDialogOpen(false);
      } catch (error) {
          setSnackBarText(error.error_description || error.message);
      }
      finally{
        setLoading(false)
      }
  }

    return (
        <div >
            <Button onClick={() => { setDialogOpen(true) }} variant="contained">Login</Button>
            <Dialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false) }}>
                <DialogContent>
                    <div className="flex flex-col gap-4 h-52 p-8 m-0">
                        <TextField
                            label="Email"
                            id="email"
                            className="w-72"
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant='contained' sx={{ width: "100%", marginInline: "auto" }} onClick={handleLoginEmail}>
                            {!loading ? "Send magic link" : <CircularProgress />}
                        </Button>
                        <Button variant='contained' color='secondary' sx={{ width: "100%", marginInline: "auto", display:"flex", gap:"0.5rem" }} onClick={handleLoginGoogle}>
                            <GoogleIcon></GoogleIcon>
                            {!loading ? "Login with Google" : <CircularProgress />}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  anchorOrigin={{ vertical: "bottom", horizontal:"right" }}
  action={action}
>
<Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
{snackBarText}
  </Alert>
</Snackbar>
        </div>
    )
}

export default Login