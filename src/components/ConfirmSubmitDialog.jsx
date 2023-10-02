import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Modal, Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useSelector, useDispatch } from 'react-redux';
import { storeUploadedFile } from '../redux/slices/fileUploadSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: 3,
  margin: '10px',
  borderRadius: '12%',
  display: ' flex',
  flexDirection: 'column',
  justifyContent: 'center', alignItems: 'center',
};

export default function ConfirmSubmitDialog({ openConfirmDialog, setOpenConfirmDialog }) {

  const [open, setOpen] = useState(openConfirmDialog);
  const [success, setScucess] = useState('false');
  const file = useSelector((state) => state.fileUpload.file)
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenConfirmDialog(false)

  };

  const handleFinish = () => {
    setOpenConfirmDialog(false)
    dispatch(storeUploadedFile(null))
  }

  const handleSuccess = () => {
    setScucess(true);
  }


  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You sure you want to submit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you submit, your responses will be final and cannot be changed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleSuccess} autoFocus>
            Yes
          </Button>


          {/* Sucess Alert */}
          {success === true ?

            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CloudDoneIcon color='success' sx={{ fontSize: '80px' }}></CloudDoneIcon>
                  <Typography color='primary' variant='h6' sx={{ marginY: 3 }}>Succesful</Typography>
                  <Typography variant='body1' color='gray' sx={{ marginY: '4px' }}>File Uploaded Succesfully</Typography>

                  <a href='/'><Button sx={{ marginTop: '20px' }}
                    variant='contained' size='medium'
                    onClick={handleFinish}>
                    Continue
                  </Button>
                  </a>
                  {/* <Alert
                      action={
                        <Button color="inherit" size="small">
                          UNDO
                        </Button>
                      }
                    >
                      This is a success alert — check it out!
                    </Alert> */}
                </Box>
              </Modal>
            </div>

            // Show error dialog box if some error happens

            :

            //   <div>
            //   <Modal
            //     open={open}
            //     onClose={handleClose}
            //     aria-labelledby="modal-modal-title"
            //     aria-describedby="modal-modal-description"

            //   >
            //     <Box sx={style}>
            //         <Typography color='error' variant='h4' sx={{marginY:3}}>Error</Typography>
            //         <Typography variant='body1' color='gray' sx={{marginY:'4px'}}>
            //           These error might be because of incompatible file type or it could be a network error. 
            //           Please ensure you are sending the right file.
            //         </Typography> 

            //         <a href='/'><Button sx={{marginTop:'20px'}} 
            //         variant='outlined' size='medium'
            //         onClick={handleFinish}>
            //           Continue
            //         </Button>
            //         </a>

            //     </Box>
            //   </Modal>
            // </div>

            null
          }
          {/* Success alert end */}

        </DialogActions>
      </Dialog>
    </div>)
}

