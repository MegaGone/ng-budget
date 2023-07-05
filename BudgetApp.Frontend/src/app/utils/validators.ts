export const numberOnly = (event): boolean => {
    const charCode = (event.which) ? event.which : event.keyCode;
    const inputValue = event.target.value + String.fromCharCode(charCode);

    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    if (inputValue.length > 4) return false;

    return true;
};