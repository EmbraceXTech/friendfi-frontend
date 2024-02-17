const capitalizeFirstLetter = (inputString: string) => {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toUpperCase();
};

export { capitalizeFirstLetter };