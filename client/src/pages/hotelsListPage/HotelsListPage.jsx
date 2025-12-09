import {useLocation, useNavigate} from 'react-router-dom';
import { useHotelsSearch } from '../../hooks/useHotelsSeach';
import { useEffect, useState } from 'react';
import { SearchForm } from '../../components/serachForm/SearchForm';
import { Header } from '../../components/navbar/Navbar';
import './hotelsListPage.scss';
import { HotelCard } from '../../components/hotelCard/HotelCard';
import { Loader } from '../../components/loader/Loader';

export const HotelsListPage = ()=> {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    const {hotels, isLoading, handleSearch} = useHotelsSearch();
    const [selectType, setSelestType] = useState('hotel');

    useEffect(()=>{
        if(Object.keys(searchParams).length > 0) {
            handleSearch(searchParams);
        }
    }, [location.search]);


    const handleSearchChange = (newParams) => {
        const queryString = new URLSearchParams(newParams).toString();
        navigate(`?${queryString}`, { replace: true });
        handleSearch(newParams); 
    };
    
    return (
        <div className='hotels-list-page_container'>
            <Header/>
            <main>
                <div className='filters-bar'>
                </div>
                <div className='content'>
                    <SearchForm onSearch={handleSearchChange} selectedType={selectType} searchData={searchParams} className='search-form'/>

                    {isLoading ? (
                        <div className='hotels-search_loader'>
                            <Loader/>
                        </div>
                    ) : (
                        <div className='hotels-list'>
                        {hotels.map(hotel => (
                            <HotelCard key = {hotel.id} hotel = {hotel}/>
                        ))}                    
                    </div>
                    )}
                    
                </div>
                
                
            </main>
        </div>
    )
}