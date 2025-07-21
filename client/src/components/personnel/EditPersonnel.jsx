import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../ui/Modal';
import { updatePersonnel } from '../../redux/slices/personnelSlice';
import personnelAPI from '../../api/personnelAPI';
import branchesAPI from '../../api/branchesAPI';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  role: Yup.string().required('Role is required'),
  head: Yup.string().optional(),
  currentBranch: Yup.string().optional(),
  isActive: Yup.boolean(),
});

const EditPersonnel = ({ id, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    role: '',
    head: '',
    currentBranch: '',
    isActive: true,
  });
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [personnel, branchesData] = await Promise.all([
          personnelAPI.getPersonnelById(id),
          branchesAPI.getAllBranches(),
        ]);

        setInitialValues({
          name: personnel.name || '',
          role: personnel.role || '',
          head: personnel.head || '',
          currentBranch: personnel.currentBranch?._id || '',
          isActive: personnel.isActive ?? true,
        });

        setBranches(branchesData);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    await dispatch(updatePersonnel({ id, personnelData: values }));
    onClose();
    navigate('/personnel/list');
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
              <label>Branch</label>
              <Field as="select" name="currentBranch">
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="currentBranch" component="div" />
            </div>

            <div>
              <label>Is Active</label>
              <Field name="isActive" type="checkbox" />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/personnel/list');
                }}
              >
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

