import React, { useEffect, useState } from 'react';
import api from '../api';
import { Box, Button, Input, Select, Text, Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function EditNote() {
    const [subject, setSubject] = useState('');
    const [facultyId, setFacultyId] = useState();
    const [semester, setSemester] = useState('');
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [id, setId] = useState('');

    const { id: noteId } = useParams();

    useEffect(() => {
        fetchData();
        setId(noteId);
    }, [noteId]);

    const fetchData = () => {
        api.get(`/api/notes/${noteId}`)
            .then(response => {
                setSubject(response.data.subject_id);
                setFacultyId(response.data.faculty_id);
                setSemester(response.data.semester_id);
            })
            .catch(error => console.error(error));

        api.get('/api/faculties')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('semester_id', semester);
        formData.append('subject_id', subject);
        formData.append('faculty_id', facultyId);
        formData.append('note', file);

        try {
            const response = await api.put(`/api/notes/${noteId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Data submitted successfully', response.data.message);
            setSubject('');
            setFile(null);
            setSemester('');
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response.data);
            } else {
                console.error('Error:', err.message);
            }
        }
    };

    return (
        <Box>
            <Box
                boxShadow="0 0 4px gray"
                padding="2vw"
                margin="3vw"
                className="flex justify-center rounded"
            >
                <form onSubmit={handleSubmit}>
                    <Text
                        fontSize={['lg', 'x-large', 'xx-large']}
                        p={3}
                        className="font-sans text-center"
                    >
                        Edit Note
                    </Text>
                    <Grid
                        templateColumns={['1fr', 'repeat(2, 1fr)']}
                        gap={4}
                        fontSize={['sm', 'md', 'lg']}
                    >
                        <Box>
                            <label htmlFor="Faculty">Select Faculty</label>
                            <Select
                                value={facultyId}
                                onChange={(e) => setFacultyId(e.target.value)}
                                required
                            >
                                <option value="">--Select Faculty--</option>
                                {data.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                        <Box>
                            <label htmlFor="semester">Select Semester</label>
                            <Input
                                type="text"
                                id="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                required
                            />
                        </Box>
                        <Box>
                            <label htmlFor="Level">Select Subject</label>
                            <Input
                                type="text"
                                id="Level"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </Box>
                        <Box>
                            <label htmlFor="link">File Note</label>
                            <Input
                                type="file"
                                id="link"
                                accept=".pdf, .docx"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </Box>
                    </Grid>
                    <Box
                        width="100%"
                        className="p-5 flex align-middle justify-center"
                    >
                        <Button
                            type="submit"
                            width={['80%', '50%', '25%']}
                            fontSize={['sm', 'md', 'lg']}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default EditNote;
