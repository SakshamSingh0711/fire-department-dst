export const pulse = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

export const shake = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;

export const glow = `
  @keyframes glow {
    0% { box-shadow: 0 0 0 0 rgba(207, 16, 32, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(207, 16, 32, 0); }
    100% { box-shadow: 0 0 0 0 rgba(207, 16, 32, 0); }
  }
`;

export const float = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;