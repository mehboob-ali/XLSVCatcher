import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
   Box, Button, Typography, Modal } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  px: 8
};

function NestedModal() {
  const jsonData= useSelector((state)=>state.fileUpload.file);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!jsonData) {
    return null; // Handle case when jsonData is empty
  }

  const columnHeaders = jsonData[0]; // Extract the first row as column headers

  return (
    <div>
      <Button onClick={handleOpen}>Preview</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{position:'absolute',
        top:'10%',
        left:'10%',
        overflow:'scroll',
        height:'auto',
        display:'block'}}
      >

      <Box sx={style}>
      <h2>Data Preview</h2>
      <TableContainer component={Paper} sx={{top :'10%', height: '80%'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, index) => (
                <TableCell sx={{fontWeight: 'bold'}} key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.slice().map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <div style={{marginTop: '3%', gap:'5%', display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
     
      <Button variant='contained' onClick={()=>alert('Data Saved Succesfully!!!')}>Submit  
        </Button>

        <Button variant='contained' color='error'
        onClick={handleClose}>
          Cancel  
        </Button>
        </div>
        </Box>
        </Modal>



      
    </div>
  );
}

export default NestedModal;
