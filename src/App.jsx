import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home/Home';
import AdminPannel from './Admin/AdminPannel';
import { Box, useColorMode } from '@chakra-ui/react';
import Layout from './components/Layout';
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import ShowFaculty from './Admin/ShowFaculty';
import EditFaculty from './Admin/EditFaculty';
import EditNote from './Admin/EditNote';
import EnterNote from './Admin/EnterNote';
import ShowNotes from './Admin/ShowNotes';
import Subjects from './Admin/Subject/Subjects';
import Semesters from './Admin/Semester/Semesters';
import EditSemester from './Admin/Semester/EditSemester';
import EditSubject from './Admin/Subject/EditSubject';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <Router>
        <Box
        className='max-w-full'
        >
          <Routes>
            <Route path="/" element={<Layout>
              <Home />
            </Layout>} />
            <Route path="/admin" element={<AdminLayout>
              <AdminPannel/>
            </AdminLayout>} />
            <Route path="/admin/faculty/edit/:id" element={<AdminLayout>
              <EditFaculty/>
            </AdminLayout>} />
            <Route path="/admin/note" element={<AdminLayout>
              <EnterNote/>
              <ShowNotes/>
            </AdminLayout>} />
            <Route path="/admin/subject" element={<AdminLayout>
              <Subjects/>
            </AdminLayout>} />
            <Route path="/admin/subject/edit/:id" element={<AdminLayout>
              <EditSubject/>
            </AdminLayout>} />
            <Route path="/admin/semester" element={<AdminLayout>
              <Semesters/>
            </AdminLayout>} />
            <Route path="/admin/semester/edit/:id" element={<AdminLayout>
              <EditSemester/>
            </AdminLayout>} />
            <Route path="/admin/note/edit/:id" element={<AdminLayout>
              <EditNote/>
            </AdminLayout>} />
          </Routes>
        </Box>
      </Router>
    </>
  )
}

export default App
