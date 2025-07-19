import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../ui/Button';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
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

const PersonnelInfo = styled.div`
  grid-column: 1 / -1;
  padding: 1rem;
  background: ${({ theme }) => theme.palette.background.dark};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  p {
    margin: 0.2rem 0;
  }
`;

const validationSchema = Yup.object().shape({
  toBranch: Yup.string().required('Destination branch is required'),
  reason: Yup.string().required('Reason is required'),
  effectiveDate: Yup.date().required('Effective date is required'),
});

const TransferForm = ({ person, onSubmit, onCancel }) => {
  const { branches } = useSelector((state) => state.branches);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      toBranch: '',
      reason: '',
      effectiveDate: new Date(),
      notes: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit({
          personnelId: person._id,
          fromBranch: person.currentBranch?._id,
          ...values,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <PersonnelInfo>
        <h4>Transferring Personnel</h4>
        <p>
          <strong>Name:</strong> {person.name}
        </p>
        <p>
          <strong>Current Branch:</strong> {person.currentBranch?.name || 'N/A'}
        </p>
        <p>
          <strong>Current Posting:</strong> {person.currentPosting?.location || 'N/A'}
        </p>
      </PersonnelInfo>

      <FormContainer>
        <FormGroup>
          <label htmlFor="toBranch">Destination Branch</label>
          <Select
            id="toBranch"
            name="toBranch"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.toBranch}
            error={formik.touched.toBranch && formik.errors.toBranch}
          >
            <option value="">Select Branch</option>
            {branches
              .filter((branch) => branch._id !== person.currentBranch?._id)
              .map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="reason">Reason for Transfer</label>
          <Select
            id="reason"
            name="reason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reason}
            error={formik.touched.reason && formik.errors.reason}
          >
            <option value="">Select Reason</option>
            <option value="Regular Rotation">Regular Rotation</option>
            <option value="Promotion">Promotion</option>
            <option value="Special Assignment">Special Assignment</option>
            <option value="Personal Request">Personal Request</option>
            <option value="Other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="effectiveDate">Effective Date</label>
          <DatePicker
            id="effectiveDate"
            name="effectiveDate"
            selected={formik.values.effectiveDate}
            onChange={(date) => formik.setFieldValue('effectiveDate', date)}
            onBlur={formik.handleBlur}
            minDate={new Date()}
            error={formik.touched.effectiveDate && formik.errors.effectiveDate}
          />
        </FormGroup>

        <FormGroup fullWidth>
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${
                formik.touched.notes && formik.errors.notes
                  ? '#f44336'
                  : '#444'
              }`,
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: 'inherit',
              fontFamily: 'inherit',
            }}
          />
        </FormGroup>
      </FormContainer>

      <FormActions>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Transfer'}
        </Button>
      </FormActions>
    </form>
  );
};

export default TransferForm;