import { useState } from 'react'
const Pagination = ({ currentPage, pageNum, setCurrentPage }) => {
    const [pagesMinPerPageLimit, setMinPagesPerPageLimit] = useState(0)
    const [pagesMaxPerPageLimit, setMaxPagesPerPageLimit] = useState(5)

    const pageTab = []
    for (let i = 0; i < pageNum; i++) {
        pageTab[i] = i + 1;
    }

    return <div className='pagination-block '>
        {currentPage > 1 && <span onClick={() => {
            if (currentPage - 1 === pagesMinPerPageLimit) {
                setMinPagesPerPageLimit(pagesMinPerPageLimit - 5 <= 1 ? 1 : pagesMinPerPageLimit - 5)
                setMaxPagesPerPageLimit(pagesMinPerPageLimit - 5 <= 1 ? 6 : pagesMaxPerPageLimit - 5)
            }
            setCurrentPage(currentPage - 1)
        }}>&#60;</span>}

        {pageTab.map((page, index) => {
            if (page >= pagesMinPerPageLimit && page < pagesMaxPerPageLimit + 1) {
                return <span className='each-page' onClick={() => {
                    setCurrentPage(index + 1)
                }} key={index} style={{ "background-color": currentPage - 1 === index ? "#2cb1ba" : "white", color: currentPage - 1 === index ? "white" : "#2cb1ba" }}>{page}</span>
            }
            return null
        })}
        {currentPage < pageNum && <span onClick={() => {
            if (currentPage + 1 > pagesMaxPerPageLimit) {
                setMaxPagesPerPageLimit(pagesMaxPerPageLimit + 5 > pageNum ? pageNum : pagesMaxPerPageLimit + 5)
                setMinPagesPerPageLimit(pagesMaxPerPageLimit + 5 > pageNum ? pageNum - 5 : pagesMinPerPageLimit + 5)
            }
            setCurrentPage(currentPage + 1)
        }}>&#62;</span>}

    </div>
}
export default Pagination