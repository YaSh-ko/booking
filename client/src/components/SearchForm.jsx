import { useState } from 'react';

export const SearchForm = ({onSearch}) => {
    const [formData, setFormData] = useState({
        city: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!formData.city.trim()) {
            alert('Введите город для поиска');
            return;
        }

        await onSearch(formData);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Найти отель</h2>

            <div className="from-group">
                <label htmlFor=''>Город</label>
                <input 
                    type="text" 
                    name='city'
                    placeholder='Введите город'
                    value={formData.city}
                    onChange={handleChange}
                    required    
                />
            </div>

            
            <div className="from-group">
                <label htmlFor=''>Дата заезда</label>
                <input 
                    type="date" 
                    name='checkIn'
                    placeholder='Заезд'
                    value={formData.checkIn}
                    onChange={handleChange}
                    required    
                />
            </div>

            
            <div className="from-group">
                <label htmlFor=''>Дата выезда</label>
                <input 
                    type="date" 
                    name='checkOut'
                    placeholder='Выезд'
                    value={formData.checkOut}
                    onChange={handleChange}
                    required    
                />
            </div>

            
            <div className="from-group">
                <label htmlFor=''>Гости</label>
                <input 
                    type="text" 
                    name='city'
                    placeholder='Введите количество гостей'
                    value={formData.guests}
                    onChange={handleChange}
                    required    
                />
            </div>

            <button
                type='submit'
                className='search-button'
            >
                Найти отель
            </button>

        </form>
    )
}