import { Header } from "../../components/navbar/Navbar"
import { SearchForm } from "../../components/serachForm/SearchForm"
import { useNavigate } from 'react-router-dom';
import './homePage.scss';
import { useState } from "react";
import { TopHotels } from "../../components/topHotels/TopHotels";

export const HomePage = ()=> {
    const [placeType, setPlaceType] = useState("hotel");

    const navigate = useNavigate();

    const handleSearch = (searchParams) => {
        navigate('/search', {
            state: {searchParams},
        })
    }

    return (
        <div className="home-page">    
            
            <Header/>

            <main className="home-page__content">
                <section className="home-page__search-section">
                    <h1 className="visually-hidden">Найти отель</h1>
                    <div className="home-page__search-container">
                        <div className="home-page__search-text">
                            <h2 className="home-page__search-title">ИСКАТЬ</h2>
                            <div className="home-page__search-tabs">
                                {["hotel", "hostel", "apartment"].map(type => (
                                    <button
                                        key={type}
                                        className={placeType === type 
                                            ? "home-page__search-tab home-page__search-tab--active" 
                                            : "home-page__search-tab"}
                                        onClick={() => setPlaceType(type)}
                                    >  
                                        {type === "hotel" ? "Отели" : type === "apartment" ? "Квартиры" : "Хостелы"}
                                        
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <SearchForm onSearch = {handleSearch} selectedType = {placeType} className="searchForm"/>
                    </div>
                    
                </section>

                <section className="home-page__top-hotels-section">
                    <h2 className="section-title">Лучшие отели</h2>
                    <TopHotels/>
                </section>
            </main>
            
        </div>
    )
}