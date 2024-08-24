import { Box, Input, Flex, Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import api from "../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditFaculty() {
  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dataSetter();
  }, [id]);

  const dataSetter = () => {
    api
      .get(`/api/faculties/${id}`)
      .then((response) => {
        setData(response.data);
        setName(response.data.name);
        setSname(response.data.short);
      })
      .catch((error) => {
        console.error(error);
        setErrors(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      short: sname,
    };
    api
      .put(`/api/faculties/${id}`, data)
      .then(() => {
        toast.success("Faculty updated successfully"),
          {
            position: "top-right",
            autoClose: 300,
          };
      })
      .catch((err) => {
        console.warn(err);
        toast.error("Unable To Edit", {
          position: "top-right",
          autoClose: 300,
        });
      })
      .finally(() => {
        setName("");
        setSname("");
        navigate("/admin");
      });
  };
  return (
    <>
      {errors ? (
        <>
          <Text className="P-5 m-11" color="red.500">
            Error No Data Found <Link to={"/admin"}>Return To Faculty</Link>
          </Text>
        </>
      ) : (
        <Box
          className="rounded  flex justify-center"
        p={[0,1,2,3]}
        m={[1,3,4,7]}
          boxShadow={"0 0 3px grey"}
        >
          <form onSubmit={handleSubmit}>
            <Text
             fontSize={['large','x-large','xx-large']}
              p={3}
              className="font-sans text-center"
            >
              Update Faculty
            </Text>
            <Box
            className="grid"
            gap={[1,2,2,2]}
            gridTemplateColumns={'auto auto'}
            >
              <label  className="my-auto" htmlFor="name">Enter Faculty</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="my-auto" htmlFor="short">Enter Shortform</label>

              <Input
                type="text"
                id="short"
                value={sname}
                onChange={(e) => {
                  setSname(e.target.value);
                }}
              />
            </Box>

            <Box
              width={"100%"}
              gap={[1,1,2]}
              p={[2,4,5]}
              className="flex align-middle justify-center"
            >
              <Button
                width={['5rem','7rem' ,'12rem' ,'16rem']}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Return
              </Button>
              <Button type="submit" width={['5rem','7rem' ,'12rem' ,'16rem']}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
}

export default EditFaculty;
