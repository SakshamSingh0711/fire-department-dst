import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import branchesAPI from '../../api/branchesAPI';

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  grid-column: ${({ fullWidth }) => (fullWidth ? '1 / -1' : 'auto')};
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  grid-column: 1 / -1;
`;

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [branches, setBranches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBranchesForForm = async () => {
      try {
        const data = await branchesAPI.getAllBranches();
        setBranches(data);
      } catch (error) {
        console.error('Failed to fetch branches for form', error);
      }
    };
    fetchBranchesForForm();
  }, []);

  const validationSchema = Yup.object().shape({
    idNumber: Yup.string().required('ID Number is required'), // 1. Add validation for idNumber
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: user ? Yup.string() : Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    branch: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      idNumber: user?.idNumber || '', // 2. Add idNumber to initial values
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      role: user?.role || 'Branch',
      branch: user?.branch?._id || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const payload = {
        ...values,
        branch: values.branch === '' ? null : values.branch,
      };
      if (!payload.password) {
        delete payload.password;
      }
      try {
        await onSubmit(payload);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormContainer>
        {/* 3. Add the input field for idNumber */}
        <FormGroup>
          <label htmlFor="idNumber">ID Number</label>
          <Input id="idNumber" name="idNumber" {...formik.getFieldProps('idNumber')} error={formik.touched.idNumber && formik.errors.idNumber} />
        </FormGroup>

        <FormGroup>
          <label htmlFor="name">Full Name</label>
          <Input id="name" name="name" {...formik.getFieldProps('name')} error={formik.touched.name && formik.errors.name} />
        </FormGroup>

        <FormGroup fullWidth>
          <label htmlFor="email">Email Address</label>
          <Input id="email" name="email" type="email" {...formik.getFieldProps('email')} error={formik.touched.email && formik.errors.email} />
        </FormGroup>
        
        <FormGroup fullWidth>
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" {...formik.getFieldProps('password')} placeholder={user ? 'Leave blank to keep same password' : ''} error={formik.touched.password && formik.errors.password} />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="role">Role</label>
          <Select id="role" name="role" {...formik.getFieldProps('role')}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Master">Master</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="branch">Branch</label>
          <Select id="branch" name="branch" {...formik.getFieldProps('branch')}>
            <option value="">-- No Branch --</option>
            {branches.map(branch => (
              <option key={branch._id} value={branch._id}>{branch.name}</option>
            ))}
          </Select>
        </FormGroup>

        <FormActions>
          <Button type="button" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save User'}
          </Button>
        </FormActions>
      </FormContainer>
    </form>
  );
};

export default UserForm;