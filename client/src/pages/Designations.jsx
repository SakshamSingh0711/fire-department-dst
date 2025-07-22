import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignations, createDesignation, updateDesignation, toggleDesignationStatus } from '../redux/slices/designationSlice';
import DesignationForm from '../components/designation/DesignationForm';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Designations = () => {
  const dispatch = useDispatch();
  const { designations = [], loading = false } = useSelector((state) => state.designations || {});
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (designation) => {
    setEditing(designation);
    setShowModal(true);
  };

  const handleToggle = (id) => {
    dispatch(toggleDesignationStatus(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Designations Management</h1>
      <Button onClick={handleCreate}>Add Designation</Button>
      {loading ? <p>Loading...</p> : (
        <div className="mt-4">
          {designations.map((designation) => (
            <div key={designation._id} className="border p-4 mb-2 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{designation.name}</p>
                <p className="text-sm text-gray-600">Status: {designation.isActive ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => handleEdit(designation)}>Edit</Button>
                <Button onClick={() => handleToggle(designation._id)}>
                  {designation.isActive ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <DesignationForm
          initialValues={editing}
          onClose={() => setShowModal(false)}
          onSubmit={(values) => {
            if (editing) dispatch(updateDesignation({ id: editing._id, data: values }));
            else dispatch(createDesignation(values));
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Designations;
