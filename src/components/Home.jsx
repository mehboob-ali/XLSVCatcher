import { Box, Container, CssBaseline, AppBar, Typography } from '@mui/material';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { storeUploadedFile } from '../redux/slices/fileUploadSlice';
import NestedModal from './DataPreview';
import XLSX from 'xlsx';

function Home() {
    const dispatch = useDispatch();
    // const jsonData2= useSelector((state)=>state.fileUpload.file);

    const [hasError, setHasError] = useState(false);
    const [jsonData, setJsonData] = useState(null)

    const handleFileChange = async (e) => {
        let file = e.target.files[0];

        if (file) {
            if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

                const data = await file.arrayBuffer();
                const workbook = XLSX.readFile(data);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                const convertToJson = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

                setJsonData(convertToJson);

                dispatch(storeUploadedFile(convertToJson))

                setHasError(false);
                alert("File Upload Succesful")
            }
            else {
                e.target.value = '';
                dispatch(storeUploadedFile(null));
                setHasError(true);
                alert('Please upload a valid CSV or Excel file.');
            }
        }
    }

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
                    XLSVCatcher
                </Typography>
            </AppBar>
            <CssBaseline />
            <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} >
                <input
                    style={{ display: 'hidden', fontSize: 18, marginTop: 40, border: '1px solid #000', padding: 8, backgroundColor: 'lightgray' }}

                    type='file'
                    accept='text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    onChange={handleFileChange}
                />
                {hasError && (
                    <div>
                        <p style={{ color: 'red', }}>Please select a valid CSV or Excel file.
                        </p>

                    </div>
                )}
                {/* {file && !hasError && <p>Selected File: {file}</p>} */}

                <NestedModal />
            </Box>
        </Container>

    )
}

export default Home