export function cpasswordValidator(confirmPassword) {
  if (!confirmPassword) return "Confirm Password can't be empty.";
  if (confirmPassword.length < 5)
    return "Confirm Password must be at least 5 characters long.";
  return "";
}
