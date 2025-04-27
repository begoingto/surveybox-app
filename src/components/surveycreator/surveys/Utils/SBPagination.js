import React, {useEffect, useState} from 'react';

const SBPagination = ({ initData }) => {
    const [results, setResults] = useState(5);
    const [data, setData] = useState(initData);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);


    const handleResultsNumber = number => {
        setResults(Number(number));
    };

    const handleNextPage = () => {
        setPage(prev => prev + 1);
        if (page+1 === totalPages) {
            setHasNextPage(false);
        }
    };

    const handlePrevPage = () => {
        setPage(prev => (prev > 0 ? prev - 1 : 0));
        if (page<= totalPages) {
            setHasNextPage(true);
        }
    };

    useEffect(() => {
        // console.log(results, Number(results + page * results));
        setData(initData.slice(page * results, results + page * results));
        setTotalPages(Math.trunc(initData.length/results));
    }, [initData, results, page, totalPages]);

    return {
        handleResultsNumber,
        data,
        handleNextPage,
        hasNextPage,
        handlePrevPage,
        total: initData.length,
    };
};

export default SBPagination;