import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkData, length) => {
    let charset = "";
    let generatePassword = "";
    const selectedOption = checkData.filter((data) => data.checked);
    if (!selectedOption.length || length==0) {
        if(length == 0) setErrorMessage("Character length should be more than 0")
        else setErrorMessage("Select at least one option");
        setPassword("");
        return;
    }
    selectedOption.forEach((option) => {
      switch (option.label) {
        case "Include Uppercase letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "1234567890";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatePassword += charset[randomIndex];
    }
    setPassword(generatePassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
