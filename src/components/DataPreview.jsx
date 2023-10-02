import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Modal } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'; import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmSubmitDialog from './ConfirmSubmitDialog';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  px: 8
};

function NestedModal() {
  const jsonData = useSelector((state) => state.fileUpload.file);


  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenconfirmDialog = () => {
    setOpenConfirmDialog(true);
  }

  if (!jsonData) {
    return <div><Button disabled sx={{ marginTop: 2 }} color='primary' variant='contained'>Preview</Button></div>
  }

  const columnHeaders = jsonData[0]; // Extract the first row as column headers

  return (
    <div>
      <Button sx={{ marginTop: 2 }} color='primary' variant='contained' onClick={handleOpen}>Preview</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: 'absolute',
          m: 2,
          height: 'auto',
          display: 'block'
        }}
      >

        <Box sx={{ ...style, width: '100%' }}>
          <Button sx={{ position: 'absolute', right: 0, top: 0 }} onClick={handleClose}>
            <CloseOutlinedIcon fontSize='large' color='error' />
          </Button>
          <h3>Data Preview</h3>
          <TableContainer component={Paper} sx={{ height: '80%', width: '100%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: 'lightgrey' }}>
                <TableRow>
                  {columnHeaders.map((header, index) => (
                    <TableCell sx={{ fontWeight: 'bold' }} key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: '2%', display: ' flex', justifyContent: 'center', alignItems: 'center' }}>

            <Button variant='contained' sx={{ width: '30%' }} onClick={handleOpenconfirmDialog}>Submit
            </Button>
            {openConfirmDialog === true ?
              <ConfirmSubmitDialog openConfirmDialog={openConfirmDialog} setOpenConfirmDialog={setOpenConfirmDialog} /> :
              <></>}

          </div>
        </Box>
      </Modal>

    </div>
  );
}

export default NestedModal;
