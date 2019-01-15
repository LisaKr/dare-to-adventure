DROP TABLE IF EXISTS options;

CREATE TABLE options(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    city  VARCHAR(255) NOT NULL,
    numOfDays INT,
    lat VARCHAR(255),
    lng VARCHAR(255)
);
