/**
 * Validation utility functions
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password strength
 * @param {string} password - The password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = password.length >= minLength && 
                  hasUpperCase && 
                  hasLowerCase && 
                  hasNumbers && 
                  hasSpecialChar;

  let message = '';
  if (!isValid) {
    const issues = [];
    if (password.length < minLength) issues.push(`at least ${minLength} characters`);
    if (!hasUpperCase) issues.push('one uppercase letter');
    if (!hasLowerCase) issues.push('one lowercase letter');
    if (!hasNumbers) issues.push('one number');
    if (!hasSpecialChar) issues.push('one special character');
    
    message = `Password must contain ${issues.join(', ')}`;
  }

  return { isValid, message };
};

/**
 * Validates a required field
 * @param {string} value - The value to validate
 * @returns {boolean} True if value is not empty
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
}; 