import { Navbar } from "../../components/navbar/Navbar"
import { SearchForm } from "../../components/serachForm/SearchForm"
import { useNavigate } from 'react-router-dom';
import './homePage.scss';
import { useState } from "react";

export const HomePage = ()=> {
    const [placeType, setPlaceType] = useState("hotel");

    const navigate = useNavigate();

    const handleSearch = (searchParams) => {
        navigate('/search', {
            state: {searchParams},
        })
    }

    return (
        <div className="home-page_container">
            <header>
                <Navbar/>
            </header>
            <main className="content">
                <section className="hero-section">
                    <div className="hero-section_search-container">
                        <div className="hero-section_search-container_text">
                            <h1>ИСКАТЬ</h1>
                            <div className="hero-section_search-container_type-tabs">
                                {["hotel", "hostel", "apartment"].map(type => (
                                    <button
                                        key={type}
                                        className={placeType === type ? "active" : ""}
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
            </main>
            
        </div>
    )
}