// importing validator library
const {body , check} = require('express-validator');

// import status values
const {Task_Status} = require('./Consts')

//importing Task Model
const CheckUpdateTaskFormValues = () => {

    return [
        // id checking
        check('TaskId' , "invalid Task id value").trim().isMongoId().notEmpty().withMessage('Task id is Required'),
        
        // checking title value
        body('Task.title' , 'Invalid Title value').trim().isLength({min:4 , max:50}).notEmpty().withMessage('Title is Required'),

        // checking description value
        body('Task.description' , 'Invalid description').trim().isLength({min:6 , max:400}).notEmpty().withMessage('Description is Required'),
        
        // checking image value
        body('Task.image' , "Invalid Image URL").trim().isURL(),

        // checking status value
        body('Task.status' , "Invalid status value, Role should be Either 'Not Started' or 'Inprogress' or 'Completed' ").trim().notEmpty().withMessage('status is Required').custom((value , {req}) =>{
                    if( !Task_Status[`${value}`] ){
                        return false
                    }
                    return true
        } )
    ]
};

module.exports = CheckUpdateTaskFormValues