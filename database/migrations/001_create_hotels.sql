CREATE TABLE hotels {
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  city VARCHAR(255), 
  class INT,
  type VARCHAR(20),
  guests INT
}