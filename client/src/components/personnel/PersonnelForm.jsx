import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  rank: Yup.string().required('Rank is required'),
  email: Yup.string().email('Invalid email').optional(),
  phone: Yup.string().optional(),
  currentBranch: Yup.string().optional(),
  isActive: Yup.boolean().optional(),
});

const PersonnelForm = ({ user, branches, onSubmit, onCancel }) => {
  const navigate = useNavigate();

  const initialValues = {
    name: user?.name || '',
    rank: user?.rank || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentBranch: user?.currentBranch?._id || '',
    isActive: user?.isActive ?? true,
  };

  const handleCancel = () => {
    onCancel();
    navigate('/personnel/list');
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        navigate('/personnel/list');
      }}
    >
      {() => (
        <Form>
          <div>
            <label>Name</label>
            <Field name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Rank</label>
            <Field name="rank" />
            <ErrorMessage name="rank" component="div" />
          </div>

          <div>
            <label>Email</label>
            <Field name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Phone</label>
            <Field name="phone" />
            <ErrorMessage name="phone" component="div" />
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
            <label>
              <Field type="checkbox" name="isActive" />
              Active
            </label>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button type="submit">Save</Button>
            <Button type="button" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PersonnelForm;