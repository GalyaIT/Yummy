import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './_Pagination.scss'

function PaginationComponent({ pages = 10, setCurrentPage }) {
    console.log(pages);

    // const pages = 10;
    const numberOfPages = [];
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i);

    }
    const [currentButton, setCurrentButton] = useState(1)
    const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState([])

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrentButtons]

        let dotsInitial = '...'
        let dotsRight = ' ...'
        let dotsLeft = '... '

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages
        }
        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]

        } else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)
            tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]
        } else if (currentButton > numberOfPages.length - 3) {
            const sliced = numberOfPages.slice(numberOfPages.length - 4)
            tempNumberOfPages = [1, dotsLeft, ...sliced]
        } else if (currentButton === dotsInitial) {
            setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length - 3] + 1)
        } else if (currentButton === dotsRight) {
            setCurrentButton(arrOfCurrentButtons[3] + 2)
        } else if (currentButton === dotsLeft) {
            setCurrentButton(arrOfCurrentButtons[3] - 2)
        }

        setArrOfCurrentButtons(tempNumberOfPages)
        setCurrentPage(currentButton)

    }, [currentButton])

    return (

        <div>
            <div className="pagination-container">
                <Link to="#" className={`${currentButton === 1 ? 'disabled' : ''}`}
                    onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}>Prev</Link>

                {arrOfCurrentButtons.map((page, index) => {
                    return (
                        <Link
                            to="#"
                            key={index}
                            onClick={() => setCurrentButton(page)}
                            className={currentButton === page ? 'active' : ''}
                        >{page}</Link>
                    )
                })}

                <Link to="#"
                    className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
                    onClick={() => setCurrentButton((prev) => prev === numberOfPages.length ? prev : prev + 1)}
                >Next</Link>
            </div>
        </div>
    )
}
export default PaginationComponent