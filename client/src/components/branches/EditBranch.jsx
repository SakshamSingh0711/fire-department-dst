import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BranchForm from '../../components/branches/BranchForm';
import { useDispatch } from 'react-redux';
import { fetchBranches, updateBranch } from '../../redux/slices/branchSlice';
import api from '../../api/branchesAPI';

const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [branch, setBranch] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!location.state) {
      const fetchBranch = async () => {
        try {
          const data = await api.getBranchById(id);
          console.log('Fetched branch from API:', data); // ✅ Debug
          setBranch(data);
        } catch (error) {
          console.error('Error loading branch:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBranch();
    } else {
      console.log('Using location.state for branch:', location.state); // ✅ Debug
    }
  }, [id, location.state]);

  const handleUpdate = async (values) => {
    console.log('Update submitted with values:', values); // ✅ Debug form values

    try {
      const res = await dispatch(updateBranch({ id, branchData: values })).unwrap();
      console.log('Update successful, response:', res); // ✅ Debug API success
      dispatch(fetchBranches());
      navigate('/branches/list');
    } catch (error) {
      console.error('Failed to update branch:', error); // ✅ Debug API failure
    }
  };

  const handleCancel = () => {
    console.log('Update cancelled'); // ✅ Debug
    navigate('/branches/list');
  };

  if (loading) return <div>Loading branch...</div>;
  if (!branch) return <div>Branch not found</div>;

  return (
    <div>
      <h2>Edit Branch</h2>
      <BranchForm
        branch={branch}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditBranch;