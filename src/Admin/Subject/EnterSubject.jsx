import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { GrAdd, GrSubtract } from "react-icons/gr";

function EnterSubject({ trigger, setTrigger }) {
  const [semester, setSemester] = useState("");
  const [semesterData, setSemesterData] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const [data, setData] = useState([{ name: "" }]);
  const [displayIndex , setDisplayIndex] = useState('-1')
  useEffect(() => {
    getFaculty();
  }, []);

  useEffect(() => {
    const label = document.querySelectorAll('label')
    label.forEach(item=>{
      item.classList.add('my-auto');
    })
    if (facultyId) {
      getSemester(facultyId);
    }
  }, [facultyId]);


  const getFaculty = () => {
    api
      .get("/api/faculties")
      .then((response) => {
        setFacultyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
      });
  };

  const getSemester = (facultyId) => {
    api
      .get(`/api/semesters/faculty/${facultyId}`)
      .then((response) => {
        setSemesterData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const SendData = data.map((data)=>{
      return {name:data.name, semester_id:semester, faculty_Id:facultyId}
    })
    console.log( SendData)
  };

  const handleChange = (index, event) => {
    const values = [...data];
    values[index].name = event.target.value;
    setData(values);
  };

  const handleAddField = () => {
    setData([...data, { name: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...data];
    values.splice(index, 1);
    setData(values);
  };

  return (
    <>
      <Box
      fontSize={[9,11,13,15]}
      m={[3,7,9,11]}
      boxShadow={"0 0 3px gray"} className="p=11 rounded flex justify-center">
        <Box className="p-11 duration-100">
          <Text className="text-2xl text-center p-5">Enter Subjects</Text>
          <form onSubmit={handleSubmit}  className="grid grid-cols-2 gap-3">
            <label htmlFor="faculty">Select Faculty:</label>
            <Select
              id="faculty"
              value={facultyId}
              onChange={(e) => {
                const selectedFacultyId = e.target.value;
                setFacultyId(selectedFacultyId);
                getSemester(selectedFacultyId);
              }}
              required
            >
              <option value="">--Select Faculty--</option>
              {facultyData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item?.name}
                </option>
              ))}
            </Select>

            <label htmlFor="semester">Semester:</label>
            <Select
              value={semester}
              id="semester"
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="">--Select Semester--</option>
              {semesterData.map((semester, index) => (
                <option key={index} value={semester.id}>
                  {semester?.name}
                </option>
              ))}
            </Select>

            <label htmlFor="name">Subject Name:</label>
            <Box className="flex flex-row gap-5">
              <Box className="flex flex-col gap-2"
              width={'100%'}
              >


                {data.map((inputField, index) => 
                <Box
                onMouseEnter={()=>{
                  setDisplayIndex(index)
                }}
                onMouseLeave={()=>{
                  setDisplayIndex(null)
                }}
                className="flex flex-row gap-2"
                key={index}
                >
                   <Input
                    type="text"
                    value={inputField.name}
                    onChange={(e) =>{
                       handleChange(index, e)
                    }}
                    onKeyDown={(e)=>{
                      console.log(e.key)
                      if(e.key === 'ArrowDown'&& e.ctrlKey) {
                        handleAddField()
                       }
                       if(e.key === "ArrowUp" && e.ctrlKey) {
                        if(data.length>1){
                          handleRemoveField(index)
                         }
                       }
                    }}
                    required
                  />
                </Box>
                
                )}
                 
              </Box>
           
            </Box>

            <Button type="submit" className="mx-auto m-3 p-6">
              Add Subject
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default EnterSubject;
