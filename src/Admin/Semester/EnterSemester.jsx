import { Box, Button, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

function EnterSemester({ trigger, setTrigger }) {
  const [name, setName] = useState("");
  const [facId, setFacId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/api/faculties")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      faculty_id: facId,
    };
    api
      .post("/api/semesters", data)
      .then((response) => {
        toast.success("Succesfully Added To Server", {
          position: "bottom-center",
          autoClose: 300,
        });
        console.log(response);
      })
      .catch((error) => {
        toast.error("Error Occured", {
          position: "bottom-center",
          autoClose: 300,
        });
        console.log(error);
      })
      .finally(() => {
        setName("");
        setTrigger(!trigger);
      });
  };

  return (
    <>
      <Box maxW={'100%'} boxShadow={"0 0 3px gray"} p={[3, 3, 9, 11]} m={[3, 3, 9, 11]} rounded={"lg"}>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center align-middle"
        >
          <Box
            className="text-xl flex align-middle justify-center flex-col gap-5"
            fontSize={[ 7, 9, 11,14]} // Adjust font size based on screen size
          >
            <Box
              display={"grid"}
              gap={[5, 7, 9, 11]} // Adjust gap size based on screen size
              gridTemplateColumns={"auto auto"}
            >
              <label htmlFor="facId">Select Faculty:</label>
              <Select
                onChange={(e) => {
                  setFacId(e.target.value);
                }}
                fontSize={[ 7, 9, 11,13]} // Adjust font size for Select
              >
                <option value="" selected>
                  --Select Faculty--
                </option>
                {data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <label htmlFor="semester">Enter Semester:</label>
              <Input
                type="text"
                value={name}
                placeholder={"Enter Semester"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                fontSize={[ 7, 9, 11,13]} // Adjust font size for Input
              />
            </Box>
            <Button
              className="w-56 mx-auto"
              type="submit"
              fontSize={[ 7, 9, 11,13]} // Adjust font size for Button
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default EnterSemester;
