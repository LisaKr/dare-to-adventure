DROP TABLE IF EXISTS activities;

CREATE TABLE activities(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    city  VARCHAR(255) NOT NULL,
    activityname  VARCHAR(255) NOT NULL,
    activitylocation VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    day  VARCHAR(255) NOT NULL,
    numOfDays INT
);
