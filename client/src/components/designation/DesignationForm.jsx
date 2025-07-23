import React from 'react';
import { useFormik } from 'formik';
import Button from '../ui/Button';

const DesignationForm = ({ initialValues = { name: '' }, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => onSubmit(values),
  });

  return (
  <form onSubmit={formik.handleSubmit} className="space-y-6 p-4">
    <div>
      <label className="block text-sm font-medium">Designation Name</label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        className="w-full border rounded p-2 mt-1"
      />
    </div>
    <div className="flex justify-end space-x-2 space-y-4">
      <Button type="button" onClick={onCancel}>Cancel</Button>
      <Button type="submit">Submit</Button>
    </div>
  </form>
);
};

export default DesignationForm;