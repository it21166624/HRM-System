export function telephoneValidator(telephone) {
  if (!telephone) {
    return "Telephone Number can't be empty.";
  }
  if (telephone.length < 9 || telephone.length > 14) {
    return "Please enter a valid mobile number.";
  }

  return "";
}

// if (14 < phoneNumber.length || 9 > phoneNumber.length) {
//   isValid = false;
//   toast.error("Please Enter Valid Mobile number.");
// }
// return isValid;
