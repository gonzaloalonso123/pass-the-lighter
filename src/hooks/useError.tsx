import { useState } from "react";

export const useError = () => {
  const [nameError, setNameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  return {
    nameError,
    locationError,
    dateError,
    messageError,
    setNameError,
    setLocationError,
    setDateError,
    setMessageError,
  };
};
