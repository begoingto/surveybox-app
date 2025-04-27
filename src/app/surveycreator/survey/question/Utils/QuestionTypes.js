import React, {useEffect, useState} from "react";
import {BsFillPlusCircleFill, BsTrash2Fill} from "react-icons/bs";
import {Button, Checkbox, Label, Radio, Select, Textarea, TextInput} from "flowbite-react";
import {questionType, ratingChoice, ratingType} from "@/store/feature/question/questionConfig";
import {useFormik} from "formik";

export const QuestionTypeEssay = ({formik}) => {
    return (
        <>
            <Textarea
                id="answer"
                disabled
                placeholder="Text answer here..."
                rows={4}
            />
        </>
    )
}


export const QuestionTypeMultiChoice = ({formik}) => {

    useEffect(() => {
        formik.setFieldValue("answerOption", "single")
    },[])

    // const [answerOption, setAnswerOption] = useState("single");
    const [answerOptionValue, setAnswerOptionValue] = useState({
        name: "",
        img: ''
    });
    const handleAddAnswerOption = () => {
        formik.setValues({...formik.values, answerSet: [...formik.values.answerSet, answerOptionValue]})
        setAnswerOptionValue({
            name: "",
            img: ""
        })
    }
    return (
        <>
            <div className="grid grid-cols-12 gap-10 mb-5">
                <div className={"col-span-12"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="typeOfRating"
                                    value="Answer Option"
                                />
                            </div>
                            <div className={"flex gap-5"}>
                                <div className="flex items-center gap-2">
                                    <Radio
                                        id="single"
                                        name="answerOption"
                                        value="single"
                                        onChange={formik.handleChange}
                                        defaultChecked
                                        // onChange={() => handleChangeOption("single")}
                                    />
                                    <Label htmlFor="single">
                                        Single
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                        id="multiple"
                                        name="answerOption"
                                        value="multiple"
                                        onChange={formik.handleChange}
                                        // onChange={() => handleChangeOption("multiple")}
                                    />
                                    <Label htmlFor="multiple">
                                        Multiple
                                    </Label>
                                </div>

                            </div>
                        </div>
                        <div
                        className={"w-40"}
                        >
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="layout"
                                    value="Layout"
                                />
                            </div>
                            <Select
                                id="layout"
                                name="layout"
                                onChange={formik.handleChange}
                                value={formik.values.layout}
                            >
                                <option value={12}>
                                    Column 1
                                </option>
                                <option value={6}>
                                    Column 2
                                </option>
                                <option value={4}>
                                    Column 3
                                </option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 self-center">
                    <div className="flex items-center gap-2 w-full">
                        {/*<Radio*/}
                        {/*    id={`addRating`}*/}
                        {/*    name="addRating"*/}
                        {/*    disabled*/}
                        {/*/>*/}

                        {formik.values.answerOption==='single'? (
                            <Radio
                                id={`addRating`}
                                name="addRating"
                                disabled
                            />
                        ) : (<Checkbox id={`chaddRating`} disabled name="addRating"/>)}

                        <TextInput
                            id={`chaddRating`}
                            name={`chaddRating`}
                            autoComplete="off"
                            placeholder="Option value"
                            className={"w-40 sm:w-full"}
                            value={answerOptionValue.name}
                            onChange={(e) => setAnswerOptionValue({...answerOptionValue,name: e.target.value})}
                        />
                        <button
                            type={"button"}
                            disabled={answerOptionValue.name===''}
                            className={`p-2 text-green-600 border-2 border-green-600 border-dashed rounded-md opacity-75 hover:opacity-100 ${answerOptionValue.name===''?"hover:cursor-not-allowed":""}`}
                            onClick={handleAddAnswerOption}
                        >
                            <BsFillPlusCircleFill />
                        </button>
                    </div>
                </div>

                <div className={"col-span-12"}>
                    <AnswerSetOptions
                        formik={formik}
                        answerOptionValue={answerOptionValue}
                        setAnswerOptionValue={setAnswerOptionValue}
                    />
                </div>
            </div>
        </>
    )
}

const AnswerSetOptions = ({formik,answerOption, answerOptionValue, setAnswerOptionValue}) => {
    const handleRemoveItem = (i) => {
        const itemsRemove = formik.values.answerSet.filter((item,index) => index!==i)
        formik.setFieldValue('answerSet',itemsRemove)
    }
    const handleUpdateItem = (e,i) => {
        formik.values.answerSet[i] = {
            name: e.target.value,
            img: ''
        }
        formik.setFieldValue('answerSet',formik.values.answerSet)
    }
    return (
        <>
            <div className={"grid grid-cols-1 sm:grid-cols-2"}>
                {formik.values.answerSet.map((item, index) =>(
                    <div key={index} className="flex items-center gap-2 my-2 w-full">

                        {formik.values.answerOption==='single'? (
                            <Radio
                                id={`ch${index}`}
                                name="anItem"
                                disabled
                                value="Single"
                            />
                        ) : (<Checkbox id={`ch${index}`} disabled name="anItem"/>)}

                        <TextInput
                            id={`ch${index}`}
                            name={`ch${index}`}
                            autoComplete="off"
                            defaultValue={item.name}
                            placeholder="Option value"
                            // onFocus={e => console.log(e.target.value)}
                            onBlur={e => handleUpdateItem(e,index)}
                        />
                        <div>
                            <button
                                type={"button"}
                                className={"mx-2 text-red-500"}
                                onClick={() => handleRemoveItem(index)}
                            >
                                <BsTrash2Fill />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export const QuestionTypeMultiChoiceArray = ({formik, index}) => {
    const [answerOption, setAnswerOption] = useState(formik.values.questions[index].answerOption || "single");
    const [answerOptionValue, setAnswerOptionValue] = useState({
        name: "",
        img: ''
    });

    const handleAddAnswerOption = () => {
        const answerSets = [...formik.values.questions[index].answerSet,answerOptionValue]
        formik.setFieldValue(`questions.${index}.answerSet`,answerSets)
        setAnswerOptionValue({
            name: "",
            img: ""
        })
    }

    const handleChangeOption =(option) => {
        setAnswerOption(option)
        formik.setFieldValue(`questions.${index}.answerOption`,option)
    }

    return (
        <div className="grid grid-cols-12 gap-10 mb-5">
            <div className="col-span-12 sm:col-span-6 self-center">
                <div className="flex items-center gap-2 w-full">

                    {answerOption==='single'? (
                        <Radio
                            id={`addItem_${index}`}
                            name="anItem"
                            disabled
                            value="Single"
                        />
                    ) : (<Checkbox id={`addItem_${index}`} disabled name="anItem"/>)}

                    <TextInput
                        id={`chaddRating`}
                        name={`chaddRating`}
                        autoComplete="off"
                        placeholder="Option value"
                        className={"w-56 sm:w-full"}
                        value={answerOptionValue.name}
                        onChange={(e) => setAnswerOptionValue({...answerOptionValue,name: e.target.value})}
                    />
                    <button
                        type={"button"}
                        disabled={answerOptionValue.name===''}
                        className={`p-2 text-green-600 border-2 border-green-600 border-dashed rounded-md opacity-75 hover:opacity-100 ${answerOptionValue.name===''?"hover:cursor-not-allowed":""}`}
                        onClick={handleAddAnswerOption}
                    >
                        <BsFillPlusCircleFill />
                    </button>
                </div>
                {/*<div className="flex items-center flex-wrap">*/}
                {/*    <TextInput*/}
                {/*        id={`optionValue`}*/}
                {/*        value={answerOptionValue.name}*/}
                {/*        onChange={(e) => setAnswerOptionValue({...answerOptionValue,name: e.target.value})}*/}
                {/*        className={"an-input"}*/}
                {/*        placeholder="Option value"*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        color="success"*/}
                {/*        onClick={handleAddAnswerOption}*/}
                {/*        className={"rounded-tl-none rounded-bl-none whitespace-nowrap"}*/}
                {/*    >*/}
                {/*        <BsFillPlusCircleFill className={"mr-2"}/> <span>Add Answer</span>*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
            <div className={"col-span-12 sm:col-span-6"}>
                <div className="flex flex-col md:flex-row gap-5">
                    <div
                        className="w-40"
                        id="select"
                    >
                        <div className="mb-2 block">
                            <Label
                                htmlFor="typeOfRating"
                                value="Answer Option"
                            />
                        </div>
                        <div className={"flex gap-5"}>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id={`single-${index}`}
                                    name="answerOption"
                                    value="single"
                                    onChange={() => handleChangeOption("single")}
                                    checked={answerOption === "single"}
                                />
                                <Label htmlFor={`single-${index}`}>
                                    Single
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio
                                    id={`multiple${index}`}
                                    name="answerOption"
                                    value="multiple"
                                    onChange={() => handleChangeOption("multiple")}
                                    checked={answerOption === "multiple"}
                                />
                                <Label htmlFor={`multiple${index}`}>
                                    Multiple
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-40"
                    >
                        <div className="mb-2 block">
                            <Label
                                htmlFor={`layout${index}`}
                                value="Layout"
                            />
                        </div>
                        <Select
                            id={`layout${index}`}
                            name="layout"
                            onChange={(e) => formik.setFieldValue(`questions.${index}.layout`,e.target.value)}
                            defaultValue={formik.values.questions[index].layout}
                        >
                            <option value={12}>
                                Column 1
                            </option>
                            <option value={6}>
                                Column 2
                            </option>
                            {/*<option value={4}>*/}
                            {/*    Column 3*/}
                            {/*</option>*/}
                        </Select>
                    </div>
                </div>
            </div>
            <div className={"col-span-12"}>
                <AnswerSetOptionsArray
                    formik={formik}
                    answerOption={answerOption}
                    answerOptionValue={answerOptionValue}
                    setAnswerOptionValue={setAnswerOptionValue}
                    index={index}
                />
            </div>
        </div>
    )
}

export const AnswerSetOptionsArray = ({formik,answerOption, answerOptionValue, setAnswerOptionValue,index}) => {
    const handleRemoveItem = (i) => {
        const itemsRemove = formik.values.questions[index].answerSet.filter((item,inI) => inI!==i)
        formik.setFieldValue(`questions.${index}.answerSet`,itemsRemove)
    }
    const handleUpdateItem = (e,i) => {
        const answerSets = formik.values.questions[index].answerSet.map((item,index) => {
            if (index===i){
                return {
                    ...item,
                    name: e.target.value
                }
            }
            return item
        })
        formik.setFieldValue(`questions.${index}.answerSet`,answerSets)
    }

    return (
        <div className={"grid grid-cols-12"}>
            {formik.values.questions[index].answerSet?.map((item, i) =>(
                <div key={i} className={`col-span-12 md:col-span-${formik.values.questions[index].layout}`}>
                    <div className="flex items-center gap-2 my-2 w-full">

                        {answerOption==='single'? (
                            <Radio
                                id={`ch${i}`}
                                name="anItem"
                                disabled
                                value="Single"
                            />
                        ) : (<Checkbox id={`ch${i}`} disabled name="anItem"/>)}

                        <TextInput
                            id={`ch${i}`}
                            name={`ch${i}`}
                            autoComplete="off"
                            defaultValue={item.name}
                            placeholder="Option value"
                            // onFocus={e => console.log(e.target.value)}
                            onBlur={e => handleUpdateItem(e,i)}
                        />
                        <div>
                            <button
                                type={"button"}
                                className={"mx-2 text-red-500"}
                                onClick={() => handleRemoveItem(i)}
                            >
                                <BsTrash2Fill />
                            </button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}


export const QuestionTypeYesNo = ({ formik }) => {
    useEffect(() => {
        if (!formik.values.answerOption) {
            formik.setFieldValue('answerOption', 'yes_no');
        }
        if (!formik.values.answerSet || formik.values.answerSet.length === 0) {
            if (formik.values.answerOption === 'yes_no') {
                formik.setFieldValue('answerSet', [
                    {
                        name: 'Yes',
                        img: ''
                    },
                    {
                        name: 'No',
                        img: ''
                    }
                ]);
            } else if (formik.values.answerOption === 'true_false') {
                formik.setFieldValue('answerSet', [
                    {
                        name: 'True',
                        img: ''
                    },
                    {
                        name: 'False',
                        img: ''
                    }
                ]);
            }
        }
    }, [formik.values.answerOption, formik.values.answerSet]);

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor="ansOption"
                    value="Answer Option"
                />
            </div>
            <div className="flex gap-5">
                <div className="flex items-center gap-2">
                    <Radio
                        id="anYN"
                        name="answerOption"
                        value="yes_no"
                        checked={formik.values.answerOption === 'yes_no'}
                        onChange={(e) => {
                            formik.setFieldValue('answerOption', 'yes_no');
                            formik.setFieldValue('answerSet', [
                                {
                                    name: 'Yes',
                                    img: ''
                                },
                                {
                                    name: 'No',
                                    img: ''
                                }
                            ]);
                        }}
                    />
                    <Label htmlFor="anYN">
                        Yes/No
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio
                        id="anTF"
                        name="answerOption"
                        value="true_false"
                        checked={formik.values.answerOption === 'true_false'}
                        onChange={(e) => {
                            formik.setFieldValue('answerOption', 'true_false');
                            formik.setFieldValue('answerSet', [
                                {
                                    name: 'True',
                                    img: ''
                                },
                                {
                                    name: 'False',
                                    img: ''
                                }
                            ]);
                        }}
                    />
                    <Label htmlFor="anTF">
                        True/False
                    </Label>
                </div>
            </div>
        </>
    );
};


export const QuestionTypeYesNoArray = ({formik, index}) => {
    const [answerOptions, setAnswerOption] = useState(formik.values.questions[index].answerOption || 'yes_no')
    const handleChangeOption = (option) => {
        // formik.setFieldValue(`questions.${index}.answerSet`,answerOptions)
        setAnswerOption(option);
        const answerSets = [...formik.values.questions[index].answerSet]
        const answerSetsCopy = answerSets.map((item,index) => {
            const answerOptionsSplit = option.toUpperCase().split('_')
            if (index===0){
                return {
                    ...item,
                    name: answerOptionsSplit[0]
                }
            }
            return {
                ...item,
                name: answerOptionsSplit[1]
            }
        })
        formik.setFieldValue(`questions.${index}.answerSet`,answerSetsCopy)
        formik.setFieldValue(`questions.${index}.answerOption`,answerOptions)
    }
    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={`ansOption-${index}`}
                    value="Answer Option"
                />
            </div>
            <div className={"flex gap-5"}>
                <div className="flex items-center gap-2">
                    <Radio
                        id={`anYN-${index}`}
                        name={`answerOption${index}`}
                        value="yes_no"
                        onChange={(e) => handleChangeOption('yes_no')}
                        checked={answerOptions==='yes_no'}
                    />
                    <Label htmlFor={`anYN-${index}`}>
                        Yes/No
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio
                        id={`anTF-${index}`}
                        name={`answerOption${index}`}
                        onChange={(e) => handleChangeOption('true_false')}
                        value="true_false"
                        checked={answerOptions==='true_false'}
                    />
                    <Label htmlFor={`anTF-${index}`}>
                        True/False
                    </Label>
                </div>
            </div>
        </>
    )
}

export const QuestionTypeRating = ({formik}) => {
    const [answerOption, setAnswerOption] = useState("none");
    const handleChangeRatingType = (e) => {
        setAnswerOption(e.target.value)
        formik.setValues({...formik.values, answerOption: e.target.value})
        formik.setFieldValue('answerSet',ratingType[e.target.value])
    }

    return (
        <>
            <div className={"grid grid-cols-12 gap-5"}>
                <div className={"col-span-6"}>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="typeOfRating"
                            value="Type of Rate"
                        />
                    </div>
                    <Select
                        id="typeOfRating"
                        name="typeOfRating"
                        value={answerOption}
                        onChange={(e) => handleChangeRatingType(e)}
                    >
                        {Object.values(ratingChoice).map((item,index) => (
                            <option key={index} value={item.toLowerCase()}>{item}</option>
                        ))}
                    </Select>
                </div>
                <div className={"col-span-6"}>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="layout"
                            value="Layout"
                        />
                    </div>
                    <Select
                        id="layout"
                        onChange={formik.handleChange}
                        value={formik.values.layout}
                    >
                        <option value={12}>
                            Column 1
                        </option>
                        <option value={6}>
                            Column 2
                        </option>
                        <option value={4}>
                            Column 3
                        </option>
                    </Select>
                </div>
                <div className={"col-span-12"}>
                    <RatingAnswerSets formik={formik} />
                </div>
            </div>
        </>
    )
}

const RatingAnswerSets = ({formik}) => {
    const [answerOptionValue, setAnswerOptionValue] = useState({
        name: "",
        img: ''
    });
    const handleRemoveItem = (i) => {
        const itemsRemove = formik.values.answerSet.filter((item,index) => index!==i)
        formik.setFieldValue('answerSet',itemsRemove)
    }
    const handleUpdateItem = (e,i) => {
        formik.values.answerSet[i] = {
            name: e.target.value,
            img: ''
        }
        formik.setFieldValue('answerSet',formik.values.answerSet)
    }

    const handleAddAnswerOption = () => {
        formik.setValues({...formik.values, answerSet: [...formik.values.answerSet, answerOptionValue]})
        setAnswerOptionValue({
            name: "",
            img: ""
        })
    }

    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
            {formik.values.answerSet.map((item, index) =>(
                <div key={index} className="flex items-center gap-2 w-full">
                    <Radio
                        id={`rating${index}`}
                        name="ratingAn"
                        disabled
                        value={item.name}
                    />

                    <TextInput
                        id={`ch${index}`}
                        name={`ch${index}`}
                        autoComplete="off"
                        value={item.name}
                        placeholder="Option value"
                        onBlur={e => handleUpdateItem(e,index)}
                    />
                    <div>
                        <button
                            type={"button"}
                            className={"mx-2 text-red-500"}
                            onClick={() => handleRemoveItem(index)}
                        >
                            <BsTrash2Fill />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-2 w-full">
                <Radio
                    id={`addRating`}
                    name="addRating"
                    disabled
                />

                <TextInput
                    id={`chaddRating`}
                    name={`chaddRating`}
                    autoComplete="off"
                    placeholder="Option value"
                    value={answerOptionValue.name}
                    onChange={(e) => setAnswerOptionValue({...answerOptionValue,name: e.target.value})}
                />
                <button
                    type={"button"}
                    disabled={answerOptionValue.name===''}
                    className={`p-2 text-green-600 border-2 border-green-600 border-dashed rounded-md opacity-75 hover:opacity-100 ${answerOptionValue.name===''?"hover:cursor-not-allowed":""}`}
                    onClick={handleAddAnswerOption}
                >
                    <BsFillPlusCircleFill />
                </button>
            </div>
        </div>
    )
}


export const QuestionTypeRatingArray = ({formik, index}) =>{
    const [answerOption, setAnswerOption] = useState("none");
    const [answerSets,setAnswerSets] = useState(formik.values.questions[index].answerSet)

    useEffect(()=>{
        setAnswerSets(ratingType[answerOption])
    },[answerOption])

    const handleChangeRatingType = (e) => {
        setAnswerOption(e.target.value)
        formik.setFieldValue(`questions.${index}`,{...formik.values.questions[index], answerOption: e.target.value})
        formik.setFieldValue(`questions.${index}.answerSet`,ratingType[e.target.value])
    }

    return (
        <div className={"grid grid-cols-12 gap-5"}>
            <div className={"col-span-6"}>
                <div className="mb-2 block">
                    <Label
                        htmlFor="typeOfRating"
                        value="Type of Rate"
                    />
                </div>
                <Select
                    id={`typeOfRating_${index}`}
                    name="typeOfRating"
                    value={answerOption}
                    onChange={(e) => handleChangeRatingType(e)}
                >
                    {Object.values(ratingChoice).map((item,index) => (
                        <option key={index} value={item.toLowerCase()}>{item}</option>
                    ))}
                </Select>
            </div>
            <div className={"col-span-6"}>
                <div className="mb-2 block">
                    <Label
                        htmlFor="layout"
                        value="Layout"
                    />
                </div>
                <Select
                    id="layout"
                    onChange={(e) => formik.setFieldValue(`questions.${index}.layout`,e.target.value)}
                    defaultValue={formik.values.questions[index].layout}
                >
                    <option value={12}>
                        Column 1
                    </option>
                    <option value={6}>
                        Column 2
                    </option>
                    <option value={4}>
                        Column 3
                    </option>
                </Select>
            </div>
            <div className={"col-span-12"}>
                <RatingAnswerSetsArray formik={formik} index={index} answerSets={answerSets} />
            </div>
        </div>
    )
}

const RatingAnswerSetsArray = ({formik,index,answerSets}) => {
    const [answerOptionValue, setAnswerOptionValue] = useState({
        name: "",
        img: ''
    });
    const handleRemoveItem = (i) => {
        const itemsRemove = formik.values.questions[index].answerSet.filter((item,index) => index!==i)
        formik.setFieldValue(`questions.${index}.answerSet`,itemsRemove)
    }
    const handleUpdateItem = (e,i) => {
        const answerSets = formik.values.questions[index].answerSet.map((item,ind) => {
            if (ind===i){
                return {
                    ...item,
                    name: e.target.value
                }
            }
            return item
        })
        formik.setFieldValue(`questions.${index}.answerSet`,answerSets)
    }

    const handleAddAnswerOption = () => {
        const answerSets = [...formik.values.questions[index].answerSet,answerOptionValue]
        formik.setFieldValue(`questions.${index}.answerSet`,answerSets)
        setAnswerOptionValue({
            name: "",
            img: ""
        })
    }
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-3"}>
            {formik.values.questions[index].answerSet.map((item, i) =>(
                <div key={i} className="flex items-center gap-2 w-full">
                    <Radio
                        id={`rating_${index}_${i}`}
                        name="ratingAn"
                        disabled
                        value={item.name}
                    />

                    <TextInput
                        id={`ch_${index}_${i}`}
                        name={`ch_${index}_${i}`}
                        autoComplete="off"
                        defaultValue={item.name}
                        placeholder="Option value"
                        onBlur={e => handleUpdateItem(e,i)}
                    />
                    <div>
                        <button
                            type={"button"}
                            className={"mx-2 text-red-500"}
                            onClick={() => handleRemoveItem(i)}
                        >
                            <BsTrash2Fill />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-2 w-full">
                <Radio
                    id={`addRating_${index}`}
                    name="addRating"
                    disabled
                />

                <TextInput
                    id={`chaddRating_${index}`}
                    name={`chaddRating`}
                    autoComplete="off"
                    placeholder="Option value"
                    value={answerOptionValue.name}
                    onChange={(e) => setAnswerOptionValue({...answerOptionValue,name: e.target.value})}
                />
                <button
                    type={"button"}
                    disabled={answerOptionValue.name===''}
                    className={`p-2 text-green-600 border-2 border-green-600 border-dashed rounded-md opacity-75 hover:opacity-100 ${answerOptionValue.name===''?"hover:cursor-not-allowed":""}`}
                    onClick={handleAddAnswerOption}
                >
                    <BsFillPlusCircleFill />
                </button>
            </div>
        </div>
    )
}