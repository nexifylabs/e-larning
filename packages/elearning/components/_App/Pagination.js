import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

const Pagination = ({ totalItems, pageSize, onPageChange, fetchData }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        onPageChange(selected + 1);
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [totalItems, pageSize]);

    return (
        <div className='pagination'>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={styles.paginationBreak}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                pageClassName={styles.paginationLink}
                previousClassName={styles.paginationLink}
                nextClassName={styles.paginationLink}
                forcePage={currentPage}
            />
        </div>
    );
};

export default Pagination;
