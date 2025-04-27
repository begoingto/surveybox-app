import React from "react";

export const CustomInputText = ({
                             edit,
                             field, // { name, value, onChange, onBlur }
                             form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                             ...props
                         }) => {
    const inValid="bg-red-50 border border-red-500 text-red-900 placeholder-red-700";
    const valid="bg-gray-50 border border-gray-300 text-gray-900";
    return(

    <>
        <input
            type="text"
            {...field}
            {...props}
            readOnly={!edit}
            className={`${touched[field.name] && errors[field.name]? inValid :valid} } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ` + (!edit ? "border-0 focus:border-0 focus:ring-0 hover:cursor-default dark:bg-transparent" : '')}
        />
        {touched[field.name] && errors[field.name] && <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {errors[field.name]}</p>}
    </>
)};

export const CustomInputTextSocialMedia = ({
                                    edit,
                                    field, // { name, value, onChange, onBlur }
                                    form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    ...props
                                }) => {
    const inValid="bg-red-50 border border-red-500 text-red-900 placeholder-red-700";
    const valid="bg-gray-50 border border-gray-300 text-gray-900";
    return(

        <>
            <input
                type="text"
                {...field}
                {...props}
                readOnly={!edit}
                className={`${touched[field.name] && errors[field.name]? inValid :valid} } text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ` + (!edit ? "border-0 focus:border-0 focus:ring-0 hover:cursor-default" : '')}
            />
            {touched[field.name] && errors[field.name] && <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors[field.name]}</p>}
        </>
    )};



export const InputRadioAndCheckboxPreview = ({type, label,id,name,...props}) => {
    return (
        <label
            className='border border-slate-400 w-full rounded-xl flex items-center space-x-2 px-5 py-2 md:text-lg hover:cursor-pointer'
        >
            <input
                {...props}
                id={id}
                type={type}
                name={name}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p>{label}</p>
        </label>
    )
}