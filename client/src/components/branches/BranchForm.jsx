import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { useSelector } from 'react-redux';

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Branch name is required'),
  code: Yup.string().required('Branch code is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number'),
  email: Yup.string().email('Must be a valid email'),
  isActive: Yup.boolean().required('Status is required'),
});

const BranchForm = ({ branch, onSubmit, onCancel }) => {
  const { personnel } = useSelector((state) => state.personnel);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: branch?.name || '',
      code: branch?.code || '',
      phone: branch?.phone || '',
      email: branch?.email || '',
      head: branch?.head?._id || '',
      isActive: branch ? branch.isActive : true,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormContainer>
        <FormGroup>
          <label htmlFor="name">Branch Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="code">Branch Code</label>
          <Input
            id="code"
            name="code"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            error={formik.touched.code && formik.errors.code}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="phone">Contact Phone</label>
          <Input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Contact Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="head">Head of Branch</label>
          <Select
            id="head"
            name="head"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.head}
          >
            <option value="">Select Head</option>
            {personnel.map((person) => (
              <option key={person._id} value={person._id}>
                {person.name} ({person.rank})
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="isActive">Status</label>
          <Select
            id="isActive"
            name="isActive"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.isActive}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </Select>
        </FormGroup>
      </FormContainer>

      <FormActions>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? branch
              ? 'Updating...'
              : 'Creating...'
            : branch
            ? 'Update Branch'
            : 'Create Branch'}
        </Button>
      </FormActions>
    </form>
  );
};

export default BranchForm;