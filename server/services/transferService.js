// const checkTransferEligibility = async (personnelId, toBranchId) => {
//   const person = await Personnel.findById(personnelId);
//   if (!person) throw new Error('Personnel not found');
  
//   const lastTransfer = await Transfer.findOne({ 
//     personnel: personnelId,
//     status: 'Approved'
//   }).sort({ createdAt: -1 });
  
//   if (lastTransfer) {
//     const monthsSinceLastTransfer = (new Date() - lastTransfer.approvedAt) / (30 * 24 * 60 * 60 * 1000);
//     if (monthsSinceLastTransfer < 6) {
//       throw new Error('Personnel must wait 6 months between transfers');
//     }
//   }
  
//   const branch = await Branch.findById(toBranchId);
//   if (!branch) throw new Error('Branch not found');
  
//   // Check if branch has vacancies
//   const personnelCount = await Personnel.countDocuments({ currentBranch: toBranchId });
//   if (personnelCount >= branch.capacity) {
//     throw new Error('Destination branch has no vacancies');
//   }
  
//   return true;
// };

// const suggestTransfers = async () => {
//   // Get all personnel with transfer requests pending > 1 year
//   const longPending = await Transfer.find({
//     status: 'Pending',
//     createdAt: { $lt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
//   }).populate('personnel', 'name rank');
  
//   // Get personnel in branches with overcapacity
//   const branches = await Branch.find();
//   const overcapacityBranches = await Promise.all(branches.map(async branch => {
//     const count = await Personnel.countDocuments({ currentBranch: branch._id });
//     return count > branch.capacity ? branch._id : null;
//   }));
  
//   const suggestions = [
//     ...longPending.map(t => ({
//       type: 'Overdue Request',
//       personnel: t.personnel,
//       fromBranch: t.fromBranch,
//       toBranch: t.toBranch,
//       priority: 'High'
//     })),
//     // Add other suggestion logic
//   ];
  
//   return suggestions;
// };