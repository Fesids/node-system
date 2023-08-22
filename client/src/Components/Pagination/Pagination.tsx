
interface Props{
    currentPage?: number;
    totalPages?: number;
    handleNextPage: (page:number) => void;
    handlePrevPage: (page:number) => void;
}

export const Pagination = ({currentPage, totalPages, handleNextPage, handlePrevPage}:Props)=>{

    return(
        <div>
            <button className="pagination-button"
            onClick={()=> handlePrevPage(currentPage?currentPage:0)}
            disabled={currentPage ===1}
            >prev</button>

            <span className="pagination-page-info">
                Page {currentPage} of {totalPages}
            </span>

            <button
                className="pagination-button"
                onClick={() => handleNextPage(currentPage?currentPage:0)}
                disabled={currentPage === totalPages}
            >
                next
            
            </button>
        </div>
    )
}