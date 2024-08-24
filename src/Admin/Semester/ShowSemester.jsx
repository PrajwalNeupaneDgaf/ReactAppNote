import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DialogBox from "../../components/DialogBox";
import { toast } from "react-toastify";

function ShowSemester({ trigger, setTrigger }) {
  const [semesters, setSemesters] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [id, setId] = useState(""); 
  const [faculties, setFaculties] = useState({});

  useEffect(() => {
    fetchData();
    fetchFaculties();
  }, [trigger]);

  const fetchData = () => {
    api
      .get("/api/semesters")
      .then((response) => setSemesters(response.data))
      .catch((err) => console.log(err));
  };

  const fetchFaculties = async () => {
    try {
      const { data } = await api.get('/api/semesters');
      const facultyIds = [...new Set(data.map((item) => item.faculty_id))];
      const facultyDetails = await Promise.all(facultyIds.map(id => api.get(`/api/faculties/${id}`)));
      const facultyMap = facultyDetails.reduce((map, response) => {
        map[response.data.id] = response.data.short;
        return map;
      }, {});
      setFaculties(facultyMap);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (id, name) => {
    setId(id);
    setOpen(true);
    setDeleteItem(name);
  };

  const confirm = () => {
    api
      .delete(`/api/semesters/${id}`)
      .then((response) => {
        setTrigger(!trigger);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 500,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 500,
        });
        console.log(err);
      });
    setId("");
    setDeleteItem("");
    setOpen(false);
  };

  const cancel = () => {
    setId("");
    setDeleteItem("");
    setOpen(false);
  };

  return (
    <Box
    boxShadow="0 0 3px gray" className="rounded-xl p-4 md:p-8 m-4 md:m-8">
      <Table  fontSize={[7,9,11,13]} className="w-full">
        <Thead>
          <Tr>
            <Th fontSize={[8,10,12,14]} >S N.</Th>
            <Th fontSize={[8,10,12,14]} >Semester</Th>
            <Th fontSize={[8,10,12,14]} >Faculty</Th>
            <Th fontSize={[8,10,12,14]} >Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {semesters.map((semester, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>
                {semester.name} ({faculties[semester.faculty_id]})
              </Td>
              <Td>{faculties[semester.faculty_id]}</Td>
              <Td>
                <Button
                  className="m-2"
                  as={Link}
                  to={`/admin/semester/edit/${semester.id}`}
                  size={[2,3,4,5]}
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => handleDeleteClick(semester.id, semester.name)}
                 size={[2,3,4,5]}
                >
                  <MdDeleteForever />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {open && (
        <DialogBox
          open={open}
          header="Delete The Content?"
          body={`Are you sure you want to delete ${deleteItem} from the table?`}
          buttonOk={confirm}
          buttonNo={cancel}
        />
      )}
    </Box>
  );
}

export default ShowSemester;
