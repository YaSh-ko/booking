-- Файл: database/seeds/seed_hotels.sql
-- Описание: Моковые данные для таблицы hotels в Supabase

INSERT INTO hotels (name, description, city, class, type, checkIn, checkOut, guests) VALUES
('Grand Palace Hotel', 'Luxury hotel in the heart of Moscow with modern amenities', 'Moscow', 5, 'hotel', 2),
('Sunny Beach Resort', 'Beachfront resort with stunning views of the Black Sea', 'Sochi', 4, 'resort', 4),
('Mountain View Lodge', 'Cozy lodge surrounded by the Altai mountains', 'Altai', 3, 'lodge', 3),
('City Comfort Inn', 'Affordable and comfortable hotel in the city center', 'St. Petersburg', 3, 'hotel', 2),
('Ocean Breeze Hotel', 'Modern hotel with ocean views and excellent service', 'Vladivostok', 4, 'hotel', 2),
('Golden Sands Spa', 'Luxurious spa resort with wellness programs', 'Crimea', 5, 'resort', 4),
('Urban Escape', 'Stylish boutique hotel for urban travelers', 'Kazan', 4, 'hotel', 2),
('Northern Lights Hotel', 'Unique hotel for viewing the Northern Lights', 'Murmansk', 4, 'hotel', 3),
('Royal Garden Hotel', 'Elegant hotel with a beautiful garden', 'Ekaterinburg', 4, 'hotel', 2),
('Lakeside Retreat', 'Tranquil retreat by Lake Baikal', 'Baikal', 3, 'lodge', 4);