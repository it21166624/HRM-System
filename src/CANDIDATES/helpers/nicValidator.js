// export function nicValidator(nic) {
//   if (!nic) {
//     return "NIC Number can't be empty.";
//   }

//   if (!/^\d{10}$|^\d{10}V$|^\d{12}$/.test(nic)) {
//     return "NIC Number should be either 12 digits or 10 digits followed by 'V'.";
//   }

//   return "";
// }

export function nicValidator(nic) {
  if (!nic) {
    return "NIC Number can't be empty.";
  }

  if (!/^\d{12}$/.test(nic)) {
    if (/^\d{10}V$/.test(nic)) {
      return "";
    } else {
      return "Invalid NIC format. Please enter either 10 digits followed by 'V' or 12 digits.";
    }
  }

  return "";
}
