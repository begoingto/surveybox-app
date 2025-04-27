import React from "react";

export const questionType = {
    essay:"ESSAY",
    yes_no:"YES_NO",
    multiple_choice:"MULTIPLE_CHOICE",
    rating:"RATING",
    // range:"RANGE",
    // scale:"SCALE"
}


export const ratingChoice = {
    none: "NONE",
    likely: "LIKELY",
    agree: "AGREE",
    satisfied: "SATISFIED",
    frequency: "FREQUENCY",
    rating: "RATING",
    number: "NUMBER",
}

export const ratingType = {
    none: [],
    number: Array.from({length: 10}).map((el,index) => {
        return {
            name: index+1,
            img: ""
        }
    }),
    likely: [
        {
            name: "Not at all likely",
            img: ""
        },
        {
            name: "Not so likely",
            img: ""
        },
        {
            name: "Somewhat likely",
            img: ""
        },
        {
            name: "Very likely",
            img: ""
        },
        {
            name: "Extremely likely",
            img: ""
        },
    ],
    agree: [
        {
            name: "Strongly disagree",
            img: ""
        },
        {
            name: "Disagree",
            img: ""
        },
        {
            name: "Neither agree nor disagree",
            img: ""
        },
        {
            name: "Agree",
            img: ""
        },
        {
            name: "Strongly agree",
            img: ""
        },
    ],
    satisfied: [
        {
            name: "Very Dissatisfied",
            img: ""
        },
        {
            name: "Dissatisfied",
            img: ""
        },
        {
            name: "Neutral",
            img: ""
        },
        {
            name: "Satisfied",
            img: ""
        },
        {
            name: "Very Satisfied",
            img: ""
        },
    ],
    frequency: [
        {
            name: "Never",
            img: ""
        },
        {
            name: "Rarely",
            img: ""
        },
        {
            name: "Sometimes",
            img: ""
        },
        {
            name: "Often",
            img: ""
        },
        {
            name: "Always",
            img: ""
        },
    ],
    rating: [
        {
            name: "Very poor",
            img: ""
        },
        {
            name: "Poor",
            img: ""
        },
        {
            name: "Average",
            img: ""
        },
        {
            name: "Good",
            img: ""
        },
        {
            name: "Excellent",
            img: ""
        },
    ]
}