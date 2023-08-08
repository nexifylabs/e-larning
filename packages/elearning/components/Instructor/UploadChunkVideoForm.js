import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function UploadChunkVideoForm({ courseId }) {
    var YOUR_CLOUD_NAME = process.env.CLOUD_NAME;
    var YOUR_UNSIGNED_UPLOAD_PRESET = process.env.UPLOAD_PRESETS;
    var POST_URL = process.env.CLOUDINARY_VIDEO_URL;

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const processFile = async (e) => {
        setLoading(true);

        var file = e.target.files[0];

        var XUniqueUploadId = +new Date();

        processFile();

        function processFile(e) {
            var size = file.size;
            var sliceSize = 99999999;
            var start = 0;

            setTimeout(loop, 3);

            function loop() {
                var end = start + sliceSize;

                if (end > size) {
                    end = size;
                }
                var s = slice(file, start, end);
                send(s, start, end - 1, size);
                if (end < size) {
                    start += sliceSize;
                    setTimeout(loop, 3);
                }
            }
        }

        function send(piece, start, end, size) {
            console.log('start ', start);
            console.log('end', end);

            var formdata = new FormData();
            console.log(XUniqueUploadId);

            formdata.append('file', piece);
            formdata.append('cloud_name', YOUR_CLOUD_NAME);
            formdata.append('upload_preset', YOUR_UNSIGNED_UPLOAD_PRESET);
            formdata.append('public_id', 'myChunkedFile2');

            var xhr = new XMLHttpRequest();
            xhr.open('POST', POST_URL, false);
            xhr.setRequestHeader('X-Unique-Upload-Id', XUniqueUploadId);
            xhr.setRequestHeader(
                'Content-Range',
                'bytes ' + start + '-' + end + '/' + size
            );

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    const progressValue = Math.round(
                        (e.loaded / e.total) * 100
                    );
                    setProgress(progressValue);
                }
            };

            xhr.onload = function () {
                // do something to response

                //USAR ESTE this.responseText PARA CREAR UN REACT STATE
                //ADENTRO DEL RESPONSE SE ENCUENTRA LA URL CUANDO SE TERMINA DE
                //SUBIR EL VIDEO
                setLoading(false);
                toast.success('Upload successful!');

                console.log(this.responseText, 'RES');
            };

            xhr.send(formdata);
        }

        function slice(file, start, end) {
            var slice = file.mozSlice
                ? file.mozSlice
                : file.webkitSlice
                ? file.webkitSlice
                : file.slice
                ? file.slice
                : noop;

            return slice.bind(file)(start, end);
        }

        function noop() {}
    };

    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    p: 2,
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: 4,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant='h5'>
                    Upload a Video To Test Its Size
                </Typography>
                <Typography variant='subtitle1'>
                    Test image/video upload
                </Typography>
                <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='body1'>Select file:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <input type='file' onChange={processFile} />
                    </Grid>
                </Grid>
                {loading && (
                    <Box sx={{ width: '100%' }}>
                        <Typography variant='body2'>Uploading...</Typography>
                        <LinearProgress
                            variant='determinate'
                            value={progress}
                            color='primary'
                            sx={{ height: '10px', borderRadius: '5px', mt: 1 }}
                        />
                    </Box>
                )}
                <Toaster />
            </Box>
        </Container>
    );
}

export default UploadChunkVideoForm;
