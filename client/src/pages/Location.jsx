// src/pages/Location.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocations, deleteLocation } from '../redux/slices/locationSlice';
import LocationForm from '../components/location/LocationForm';
import Button from '../components/ui/Button';

const Location = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.locations);

  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleEdit = (loc) => {
    setEditData(loc);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      dispatch(deleteLocation(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Office Locations</h2>
        <Button onClick={() => { setShowForm(true); setEditData(null); }}>Add Location</Button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && (
        <p className="text-red-500">
          {typeof error === 'string' ? error : error?.message || 'An unexpected error occurred'}
        </p>
      )}

      {showForm && (
        <LocationForm
          initialData={editData}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
        />
      )}

      <ul className="mt-4 space-y-3">
        {(Array.isArray(locations) ? locations : []).map((loc) => (
          <li
            key={loc._id}
            className="flex justify-between items-center p-3 border rounded shadow-sm"
          >
            <span className="text-lg">{loc.name}</span>
            <div className="space-x-2">
              <Button onClick={() => handleEdit(loc)}>Edit</Button>
              <Button onClick={() => handleDelete(loc._id)} variant="danger">
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Location;