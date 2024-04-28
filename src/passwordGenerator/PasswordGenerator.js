import react, { useState } from "react";
import styles from "./passwordGenerator.module.scss";
import { checkBoxDatas } from "./passswordGenerator.constants";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import PasswordStrength from "../components/passwordStrength.js/PasswordStrength";

const PasswordGenerator = (props) => {
  const [range, setRange] = useState(0);
  const [copytext, setCopyText] = useState("Copy");
  const [checkBoxData, setCheckBoxData] = useState(checkBoxDatas);

  const {password, errorMessage, generatePassword} = usePasswordGenerator();

  const handleChecked = (id) => {
    const updatedData = checkBoxData.map((data, idx) => {
      if (idx === id) data.checked = !data.checked;
      return data;
    });
    setCheckBoxData(updatedData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyText("Copied");
    setTimeout(()=> {
        setCopyText("Copy");
    }, 1000)
  }

  return (
    <div className={styles.container}>
      {password && <div className={styles.header}>
        <div className={styles.title}>{password}</div>
        <button className={styles.button} onClick ={handleCopy}>{copytext}</button>
      </div>}
      <div className={styles.charLength}>
        <label className={styles.character}>
          <span>Character Length</span>
          <span>{range}</span>
        </label>
        <input
          className={styles.input}
          type="range"
          min={0}
          max={20}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
      </div>
      <div className={styles.checkboxes}>
        {checkBoxData.map((data, idx) => {
          return (
            <div className={styles.checkBox}>
              <input
                className={styles.checkBoxInput}
                type="checkbox"
                checked={data.checked}
                onChange={() => handleChecked(idx)}
              />
              <label>{data.label}</label>
            </div>
          );
        })}
      </div>
      <div className={styles.submitPassword}>
        {password && <PasswordStrength  password={password} />}
        <div className={styles.error}>{errorMessage}</div>
        <button className={styles.generateButton} onClick={() => generatePassword(checkBoxData, range)}>Generate Password</button>
      </div>
    </div>
  );
};
export default PasswordGenerator;
