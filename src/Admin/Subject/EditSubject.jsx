import { Box, Button, Select, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';

function EditSubject() {
    const [name, setName] = useState('');
    const [semesterId, setSemesterId] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [semesterData, setSemesterData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchData();
        fetchFaculty();
    }, [id]);

    const fetchData = () => {
        api.get(`/api/subjects/${id}`)
            .then((response) => {
                setName(response.data[0].name);
                setSemesterId(response.data[0].semester_id);
                setFacultyId(response.data[0].faculty_id);
                fetchSemester(response.data[0].faculty_id);
            })
            .catch((err) => console.error(err));
    };

    const fetchFaculty = () => {
        api.get('/api/faculties')
            .then((response) => {
                setFacultyData(response.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchSemester = (facultyId) => {
        api.get(`/api/semesters/faculty/${facultyId}`)
            .then((response) => {
                setSemesterData(response.data);
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            semester_id: semesterId,
            faculty_id: facultyId,
        };
        api.put(`/api/subjects/${id}`, data)
            .then((response) => {
                console.log(response.data);
                window.history.back();
            })
            .catch((err) => console.error(err));
    };

    return (
        <Box
            boxShadow="0 0 4px gray"
            padding={['6', '8']}
            margin={['4', '6']}
            borderRadius="md"
            maxWidth="600px"
            mx="auto"
        >
            <Text fontSize={['xl', '2xl']} fontWeight="bold" textAlign="center" mb={['4', '6']}>
                Edit Subject
            </Text>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
                <Text as="label" htmlFor="name" fontSize={['sm', 'md', 'lg']} fontWeight="bold">
                    Subject Name:
                </Text>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fontSize={['sm', 'md', 'lg']}
                />

                <Text as="label" htmlFor="semester" fontSize={['sm', 'md', 'lg']} fontWeight="bold">
                    Semester:
                </Text>
                <Select
                    id="semester"
                    value={semesterId}
                    onChange={(e) => setSemesterId(e.target.value)}
                    required
                    fontSize={['sm', 'md', 'lg']}
                >
                    {semesterData.length > 0 ? (
                        semesterData.map((semester, index) => (
                            <option key={index} value={semester.id}>
                                {semester.name}
                            </option>
                        ))
                    ) : (
                        <option value="">No semesters available</option>
                    )}
                </Select>

                <Text as="label" htmlFor="faculty" fontSize={['sm', 'md', 'lg']} fontWeight="bold">
                    Select Faculty:
                </Text>
                <Select
                    id="faculty"
                    value={facultyId}
                    onChange={(e) => {
                        const selectedFacultyId = e.target.value;
                        setFacultyId(selectedFacultyId);
                        fetchSemester(selectedFacultyId);
                    }}
                    required
                    fontSize={['sm', 'md', 'lg']}
                >
                    {facultyData.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Select>

                <Box gridColumn="span 2" textAlign="center">
                    <Button type="submit" width={['100%', '50%']} padding={['4', '6']} fontSize={['sm', 'md', 'lg']}>
                        Update Subject
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default EditSubject;
