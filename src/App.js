import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const OTP_digit_count = 4;
  const [inputArr, setInputArr] = useState(new Array(OTP_digit_count).fill(""));

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    const newVal = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newVal.slice(-1);
    setInputArr(newArr);

    newVal && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>OTP Input</h1>
      <div>
        {inputArr.map((input, index) => {
          return (
            <input
              className="otp-input"
              key={index}
              type="text"
              value={inputArr[index]}
              onChange={(e) => handleOnChange(e.target.value, index)}
              ref={(input) => (refArr.current[index] = input)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}
