import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { createLocation, updateLocation, fetchLocations } from '../../redux/slices/locationSlice';
import Button from '../ui/Button';

const LocationForm = ({ initialData = null, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    if (initialData) {
      await dispatch(updateLocation({ id: initialData._id, data: values }));
    } else {
      await dispatch(createLocation(values));
    }
    dispatch(fetchLocations());
    resetForm();
    onClose();
  };

  return (
    <div className="p-4 border rounded shadow mt-4 bg-white">
      <Formik
        initialValues={{ name: initialData?.name || '' }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-3">
          <label className="text-sm font-medium">Location Name</label>
          <Field name="name" className="border p-2 rounded" />
          <div className="flex gap-2">
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
            <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LocationForm;