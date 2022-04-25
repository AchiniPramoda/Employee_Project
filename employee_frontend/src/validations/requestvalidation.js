import joi from "joi"

const Validations = (employee_for_validation) => {
    const schema = joi.object({
        title: joi.string().min(3).max(255).required().messages({
            "string.empty": `Employee title is required.`,
            "any.required": `Employee title is required.`,
            "string.base": `Employee title should be a type of 'text'.`,
           
        }),
     
    
        email:joi.string().required().messages({
          
            "any.required": `Email required.`,
            "date.base": `Please enter Date of Birth.`,
        }),
        description: joi.string().required().messages({
            "string.empty": `Employee Number is required.`,
            "any.required": `Employee Number is required.`,
            "string.base": `Employee Number should be a type of 'text'.`,
       
        }),
        
    });

    const result = schema.validate(employee_for_validation);

    if (result.error) {
        return {
            status: false,
            error: result.error.message,
        }
    } else {
        return {
            status: true
        }
    }
};

export default Validations;