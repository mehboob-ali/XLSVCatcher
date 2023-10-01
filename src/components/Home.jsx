import { Box, Container, CssBaseline, AppBar, Typography } from '@mui/material';
import  { useState } from 'react'
import {  useDispatch } from 'react-redux';
import { storeUploadedFile } from '../redux/slices/fileUploadSlice';
import NestedModal from './DataPreview';
import XLSX from 'xlsx'
function Home() {
    console.log("START")
    const dispatch = useDispatch();
    // const jsonData2= useSelector((state)=>state.fileUpload.file);

    const [hasError, setHasError] = useState(false);
    const [jsonData, setJsonData]= useState(null)

// console.log(file)
    const handleFileChange = async (e) => {
        let file = e.target.files[0];



        if (file) {
            if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
               
                const data= await file.arrayBuffer();
                const workbook = XLSX.readFile(data);

                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const convertToJson = XLSX.utils.sheet_to_json(worksheet, {header: 1, raw: false});
                setJsonData(convertToJson);
                console.log("*******************&&&&&&&&&&$%^$",jsonData)

                // console.log("workbook",XLSX.utils.sheet_to_json(worksheet, {raw: false}));
                dispatch(storeUploadedFile(convertToJson))
                console.log("success")
                setHasError(false);
                alert("File Upload Succesful")
            }
            else {
                e.target.value='';
                console.log("please upload excel or csv file only");
                dispatch(storeUploadedFile(null));
                setHasError(true);
                alert('Please upload a valid CSV or Excel file.');
            }
        }
    }
    // const handlePreview=()=>{
    //     // console.log("file type is:",file);

    // }
    return (
        <Container maxWidth='lg'>
            <AppBar position='static'>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        m: 2,
                        display: { xs: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    File Upload
                </Typography>
            </AppBar>
            <CssBaseline />
            <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} >
            <input
          type='file'
          accept='text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          onChange={handleFileChange}
        />
        {hasError && (
          <p style={{ color: 'red' }}>Please select a valid CSV or Excel file.</p>
        )}
        {/* {file && !hasError && <p>Selected File: {file}</p>} */}

            <NestedModal />
            </Box>
        </Container>

    )
}

export default Home