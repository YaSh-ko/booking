import {useLocation} from 'react-router-dom';
import { useHotelsSearch } from '../../hooks/useHotelsSeach';
import { useEffect } from 'react';
import { SearchForm } from '../../components/serachForm/SearchForm';

export const SearchResultsPage = ()=> {
    const location = useLocation();
    const searchParams = location.state?.searchParams;
    console.log("Параметры поиска", searchParams);
    const [hotels, handleSearch] = useHotelsSearch();

    useEffect(()=>{
        if(searchParams) {
            handleSearch(searchParams)
            console.log(hotels);
        }
    }, [searchParams]);

    
    return (
        <div>
            <SearchForm onSearch={handleSearch}/>
            <div>
                Hotels: {hotels.map(hotel => (
                    <div key={hotel.id}>
                        <h2>Название: {hotel.name}</h2>
                        <p>Описание: {hotel.description}</p>
                        <p>Город: {hotel.city}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}