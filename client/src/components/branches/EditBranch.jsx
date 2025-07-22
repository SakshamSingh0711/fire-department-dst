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
          setBranch(data);
        } catch (error) {
          console.error('Error loading branch:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBranch();
    }
  }, [id, location.state]);

  const handleUpdate = async (values) => {
    if (!values.name || values.name.trim() === '') {
      console.error('Branch name is required');
      return;
    }

    try {
      const res = await dispatch(updateBranch({ id, ...values })).unwrap();
      dispatch(fetchBranches());
      navigate('/branches/list');
    } catch (error) {
      console.error('Failed to update branch:', error);
    }
  };

  const handleCancel = () => {
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