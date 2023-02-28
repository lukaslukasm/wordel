const VALID_EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function isEmailValid(email: string) {
	return email.match(VALID_EMAIL_REGEX);
}
export default isEmailValid;
