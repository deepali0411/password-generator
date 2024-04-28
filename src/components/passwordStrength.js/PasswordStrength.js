import react from "react";
import styles from './passwordStrength.module.scss';

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (password.length < 4) return "Very Poor";
    else if (password.length < 8) return "Poor";
    else if (password.length < 12) return "Medium";
    else if (password.length < 16) return "Strong";
    else return "Very Strong";
  };

  return (
    <div className={styles.strength}>
      <span>Strength: </span>
      <span>{getStrength()}</span>
    </div>
  );
};
export default PasswordStrength;
