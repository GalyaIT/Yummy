import './_Cooks.scss'
import { useState, useEffect } from 'react'
import * as authService from '../../services/authService'
import Cook from './Cook/Cook'
import Pagination from '../Shared/Pagination/Pagination'
import Loader from '../Loader/Loader'

const Cooks = () => {
    const [cooks, setCooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        authService.getAll()
            .then(res => setCooks(res));
        setLoading(true)
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = cooks.slice(indexOfFirstItem, indexOfLastItem)
    const howManyPages = Math.ceil(cooks.length / itemsPerPage)

    console.log(howManyPages);

    if (!loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className="cooks">
                <div className="cooks-wrapper">                
                      { currentItems.map(x =>
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
}

export default Cooks




