    class Form {

    /**
     * Validate Login
     * @param str 
     * @returns boolean
     */
    static validEmail(str: string) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }

    /**
     * Minimum length of string
     * @param str 
     * @param length 
     * @returns 
     */
    static minLength(str: string, length: number) {
        let isInvalid = false;

        if (str.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    /**
     * Form Validator
     * @param  obj 
     * @returns 
     */
    static validator(obj: any) {
        return true
    }
}

export default Form