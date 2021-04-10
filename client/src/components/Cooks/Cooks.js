import './_Cooks.scss'
import { useState, useEffect } from 'react'
import * as authService from '../../services/authService'
import Cook from './Cook/Cook'
import Pagination from '../Shared/Pagination/Pagination'


const Cooks = () => {
    const [cooks, setCooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cooksPerPage] = useState(6)


    useEffect(() => {
        authService.getAll()
            .then(res => setCooks(res));


            return () => console.log('Component will unmount');


    }, [])

    const indexOfLastItem = currentPage * cooksPerPage
    const indexOfFirstItem = indexOfLastItem - cooksPerPage
    const currentItems = cooks.slice(indexOfFirstItem, indexOfLastItem)
    const howManyPages = Math.ceil(cooks.length / cooksPerPage)

console.log(howManyPages);


    return (
        <div className="cooks">

            <div className="cooks-wrapper">
                {cooks.length === 0 ?
                    <span className="ccok-wrapper__message"> No users to display...</span> :
                    currentItems.map(x =>
                        <Cook key={x._id}
                            id={x._id}
                            username={x.username}
                            recipes={x.recipes.length} />
                    )}
            </div>
           
            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />

        </div>
    )
}

export default Cooks




