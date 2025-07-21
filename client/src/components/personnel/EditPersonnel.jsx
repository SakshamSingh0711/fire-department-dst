import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../ui/Modal';
import { updatePersonnel } from '../../store/slices/personnelSlice';
import personnelAPI from '../../api/personnelAPI';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  role: Yup.string().required('Role is required'),
  head: Yup.string().optional(),
  isActive: Yup.boolean()
});

const EditPersonnel = ({ id, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    role: '',
    head: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      personnelAPI.getPersonnelById(id).then((data) => {
        setInitialValues({
          name: data.name || '',
          role: data.role || '',
          head: data.head || '',
          isActive: data.isActive ?? true
        });
      });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    await dispatch(updatePersonnel({ id, personnelData: values }));
    onClose();
    navigate('/personnel/list'); // Ensure this route exists
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Personnel" size="medium">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Role</label>
              <Field name="role" />
              <ErrorMessage name="role" component="div" />
            </div>
            <div>
              <label>Head</label>
              <Field name="head" />
              <ErrorMessage name="head" component="div" />
            </div>
            <div>
              <label>Is Active</label>
              <Field name="isActive" type="checkbox" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit">Update</button>
              <button type="button" onClick={() => { onClose(); navigate('/personnel/list'); }}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditPersonnel;