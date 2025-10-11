import {useLocation} from 'react-router-dom';
import { useHotelsSearch } from '../../hooks/useHotelsSeach';
import { useEffect } from 'react';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { Navbar } from '../../components/navbar/Navbar';
import './hotelsListPage.scss';
import { HotelCard } from '../../components/hotelCard/HotelCard';

export const HotelsListPage = ()=> {
    const location = useLocation();
    const searchParams = location.state?.searchParams;
    console.log("Параметры поиска", searchParams);
    const [hotels, handleSearch] = useHotelsSearch();

    useEffect(()=>{
        if(searchParams) {
            handleSearch(searchParams);
        }
    }, [searchParams]);

    
    return (
        <div className='hotels-list-page_container'>
            <header>
                <Navbar/>
            </header>
            <main>
                <div className='filters-bar'>
                    <div></div>
                </div>
                <div className='content'>
                    <SearchForm onSearch={handleSearch} className='search-form'/>
                    <div className='hotels-list'>
                        {hotels.map(hotel => (
                            <HotelCard key = {hotel.id} hotel = {hotel}/>
                        ))}                    
                    </div>
                </div>
                
                
            </main>
        </div>
    )
}