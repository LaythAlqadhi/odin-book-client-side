const handleInputValidation = (e) => {
  const el = e.target;

  if (el.validity.tooShort) {
    el.setCustomValidity(
      `${el.placeholder} must be at least ${el.minLength} characters`,
    );
  } else if (el.validity.tooLong) {
    el.setCustomValidity(
      `${el.placeholder} must be at most ${el.maxLength} characters`,
    );
  } else if (el.validity.rangeUnderflow) {
    el.setCustomValidity(`${el.placeholder} must be at least ${el.min}`);
  } else if (el.validity.rangeOverflow) {
    el.setCustomValidity(`${el.placeholder} must be at most ${el.max}`);
  } else if (el.validity.valueMissing) {
    el.setCustomValidity(`${el.placeholder} must not be empty`);
  } else if (el.validity.typeMismatch) {
    el.setCustomValidity(`Invalid ${el.placeholder.toLowerCase()}`);
  } else if (el.validity.patternMismatch) {
    if (el.type === 'password') {
      el.setCustomValidity('Password is not strong enough');
    } else {
      el.setCustomValidity(`${el.placeholder} is invalid`);
    }
  } else if (
    el.name === 'passwordConfirmation' ||
    el.value === 'password confirmation'
  ) {
    const passwordInput = e.target.parentNode.password;
    if (el.value !== passwordInput.value) {
      el.setCustomValidity('Passwords do not match');
    } else {
      el.setCustomValidity('');
    }
  } else {
    el.setCustomValidity('');
  }
};

export default handleInputValidation;
