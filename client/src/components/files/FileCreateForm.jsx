import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
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
  fileNo: Yup.string().required('File number is required'),
  subject: Yup.string().required('Subject is required'),
  details: Yup.string().required('Details are required'),
  receivedFrom: Yup.string().required('Received from is required'),
  branch: Yup.string().required('Branch is required'),
  urgency: Yup.string().required('Urgency level is required'),
});

const FileCreateForm = ({ onSubmit, onCancel }) => {
  const { branches = [] } = useSelector((state) => state.branches);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      fileNo: '',
      subject: '',
      details: '',
      receivedFrom: '',
      branch: '',
      urgency: 'Medium',
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
          <label htmlFor="fileNo">File Number</label>
          <Input
            id="fileNo"
            name="fileNo"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fileNo}
            error={formik.touched.fileNo && formik.errors.fileNo}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="subject">Subject</label>
          <Input
            id="subject"
            name="subject"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            error={formik.touched.subject && formik.errors.subject}
          />
        </FormGroup>

        <FormGroup fullWidth>
          <label htmlFor="details">Details</label>
          <TextArea
            id="details"
            name="details"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            error={formik.touched.details && formik.errors.details}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="receivedFrom">Received From</label>
          <Input
            id="receivedFrom"
            name="receivedFrom"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.receivedFrom}
            error={formik.touched.receivedFrom && formik.errors.receivedFrom}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="branch">Branch</label>
          <Select
            id="branch"
            name="branch"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.branch}
            error={formik.touched.branch && formik.errors.branch}
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="urgency">Urgency Level</label>
          <Select
            id="urgency"
            name="urgency"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.urgency}
            error={formik.touched.urgency && formik.errors.urgency}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormGroup>
      </FormContainer>

      <FormActions>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create File'}
        </Button>
      </FormActions>
    </form>
  );
};

export default FileCreateForm;
