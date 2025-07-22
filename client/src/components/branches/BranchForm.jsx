import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';

const FormContainer = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
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
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Branch name is required'),
});

const BranchForm = ({ branch, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: branch?.name || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Branch form submission error:', err);
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
      </FormContainer>
    </form>
  );
};

export default BranchForm;