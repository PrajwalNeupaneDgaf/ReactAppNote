import { Box, Button, CircularProgress, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

function EditSemester() {
  const [name, setName] = useState("");
  const [facId, setFacId] = useState("");
  const [facData, setFacData] = useState([]);
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
      setData(id);
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/faculties');
      setFacData(response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const setData = (id) => {
    setLoading(true)
    api
      .get(`/api/semesters/${id}`)
      .then((response) => {
        console.log(response.data)
        setName(response.data[0].name);
        setFacId(response.data[0].faculty_id);
        setLoading(false)
      })
      .catch((err) => console.log('Error fetching semester data:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      faculty_id: facId,
    };
    console.log(data);
    api
      .put(`/api/semesters/${id}`, data)
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
      .finally(() => {
        setName("");
        navigate("/admin/semester");
      });
  };

  return (
    <>
      {loading?<Box
      
      >
        <CircularProgress color="inherit" />
      </Box>:
        <Box boxShadow={"0 0 3px gray"}
        marginTop={['4rem',0 ,0]}
        margin={[0,6,12]}
        className="p-8 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center align-middle"
        >
          <Box className="text-xl flex align-middle justify-center flex-col gap-5">
            <Box
              display={"grid"}
              width={"fit-content"}
              gap={5}
              gridTemplateColumns={"auto auto"}
            >
              <label htmlFor="semester">Enter Semester:</label>
              <Input
                type="text"
                value={name}
                placeholder={"Enter Semester"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <label htmlFor="facId">Select Faculty:</label>
              <Select
                value={facId} 
                onChange={(e) => {
                  setFacId(e.target.value);
                }}
              >
                {facData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Button className="w-56 mx-auto" type="submit">
              Update
            </Button>
          </Box>
        </form>
      </Box>}
    </>
  );
}

export default EditSemester;
