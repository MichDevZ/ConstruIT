export interface IValidations {
    rut: validation;
    name: validation;
    lastName: validation;
    dateOfBirth: validation;
    email: validation;
    phone: validation;

}


interface validation {
    style: string;
    error: string;
}