import { Navbar } from "../../components/navbar/Navbar"
import { SearchForm } from "../../components/serachForm/SearchForm"
import { useNavigate } from 'react-router-dom';

export const HomePage = ()=> {
    const navigate = useNavigate();

    const handleSearch = (searchParams) => {
        navigate('/search', {
            state: {searchParams},
        })
    }

    return (
        <div>
            <Navbar/>
            <SearchForm onSearch={handleSearch}/>
        </div>
    )
}