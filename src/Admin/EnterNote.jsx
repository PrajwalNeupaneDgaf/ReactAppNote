import { Box, Button, Input, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import api from '../api';

function EnterNote() {
    const [subject, setSubject] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [semester, setSemester] = useState('');
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [semesterData, setSemesterData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/api/faculties')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    };

    const GetSemester = (facultyId) => {
        api.get(`/api/semesters/faculty/${facultyId}`)
            .then(response => {
                setSemesterData(response.data);
            })
            .catch(error => {
                setSemester('');
                console.log(error);
            });
    };

    const getSubjects = (semester) => {
        api.get(`/api/subjects/semester/${semester}`)
            .then(response => {
                setSubjectData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('semester_id', semester);
        formData.append('subject_id', subject);
        formData.append('faculty_id', facultyId);
        formData.append('note', file);

        try {
            const response = await api.post('/api/notes', formData, {
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
        <Box padding={['4', '6', '8']} margin={['2', '4', '6']} mx="auto">
            <Box boxShadow="0 0 4px gray" padding={['4', '6', '8']} marginBottom={['4', '6', '8']} borderRadius="md">
                <form onSubmit={handleSubmit}>
                    <Text fontSize={['lg', 'xl', '2xl']} marginBottom={['4', '6']} textAlign="center" fontWeight="bold">
                        Enter Note
                    </Text>
                    <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} gap={['4', '6', '8']}>
                        <label htmlFor="Faculty">Select Faculty</label>
                        <Select
                            value={facultyId}
                            onChange={(e) => {
                                setFacultyId(e.target.value);
                                GetSemester(e.target.value);
                            }}
                            required
                            fontSize={['sm', 'md', 'lg']}
                        >
                            <option value="">--Select Faculty--</option>
                            {data.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="semester">Select Semester</label>
                        <Select
                            value={semester}
                            onChange={(e) => {
                                setSemester(e.target.value);
                                getSubjects(e.target.value);
                            }}
                            required
                            fontSize={['sm', 'md', 'lg']}
                        >
                            <option value="">--Select Semester--</option>
                            {semesterData.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="Level">Select Subject</label>
                        <Select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            fontSize={['sm', 'md', 'lg']}
                        >
                            <option value="">--Select Subject--</option>
                            {subjectData.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>

                        <label htmlFor="link">File Note</label>
                        <Input
                            type="file"
                            id="link"
                            accept=".pdf, .docx"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                            fontSize={['sm', 'md', 'lg']}
                        />
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={['4', '6', '8']}>
                        <Button type="submit" width={['100%', '50%', '30%']} fontSize={['sm', 'md', 'lg']}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default EnterNote;
