DROP DATABASE IF EXISTS sproutly_app_db;
CREATE DATABASE sproutly_app_db;
USE sproutly_app_db;

-- -----------------------------------------------------
-- users
-- -----------------------------------------------------
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY username_UNIQUE (username),
    UNIQUE KEY email_UNIQUE (email)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- plant_catalog
-- -----------------------------------------------------
CREATE TABLE plant_catalog (
    id INT NOT NULL AUTO_INCREMENT,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100),
    description TEXT,
    watering_guide TEXT,
    sunlight_req VARCHAR(50),
    image_url VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- user_plants
-- -----------------------------------------------------
CREATE TABLE user_plants (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    catalog_id INT NULL,
    custom_name VARCHAR(100) NOT NULL,
    location ENUM('Living Room','Balcony','Kitchen','Bedroom'),
    last_watered DATE,
    image VARCHAR(255),
    date_added TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (id),

    INDEX user_id_idx (user_id),
    INDEX catalog_id_idx (catalog_id),

    CONSTRAINT fk_user_plants_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_plants_plant_catalog
        FOREIGN KEY (catalog_id)
        REFERENCES plant_catalog(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- reminders
-- -----------------------------------------------------
CREATE TABLE reminders (
    id INT NOT NULL AUTO_INCREMENT,
    user_plant_id INT NOT NULL,
    reminder_type ENUM('Water','Fertilizer','Prune','Repot') NOT NULL,
    frequency_days INT NOT NULL,
    next_due_date DATE NOT NULL,
    is_completed TINYINT DEFAULT 0,

    PRIMARY KEY (id),

    INDEX user_plant_id_idx (user_plant_id),

    CONSTRAINT fk_reminders_user_plants
        FOREIGN KEY (user_plant_id)
        REFERENCES user_plants(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- favorites
-- -----------------------------------------------------
CREATE TABLE favorites (
    user_id INT NOT NULL,
    catalog_id INT NOT NULL,

    PRIMARY KEY (user_id, catalog_id),

    INDEX fk_favorites_users_idx (user_id),
    INDEX fk_favorites_plant_catalog_idx (catalog_id),

    CONSTRAINT fk_favorites_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_favorites_plant_catalog
        FOREIGN KEY (catalog_id)
        REFERENCES plant_catalog(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Seed Data
-- -----------------------------------------------------

INSERT INTO users (username, email, password_hash)
VALUES
('rgalang', 'rgalang@gmail.com', 'testpassword'),
('testuser', 'testuser@gmail.com', 'testuserpassword'),
('testuser2', 'testuser2@gmail.com', 'testuser2password');

INSERT INTO plant_catalog
(common_name, scientific_name, description, watering_guide, sunlight_req, image_url)
VALUES
(
    'Monstera Deliciosa',
    'Monstera deliciosa',
    'Famous for its iconic leaf holes, this tropical plant adds a dramatic flair to any indoor space.',
    'Water every 1-2 weeks, allowing the soil to dry out between waterings.',
    'Bright indirect light',
    NULL
),
(
    'Snake Plant',
    'Dracaena trifasciata',
    'A hardy, low-maintenance plant known for its upright, sword-like leaves. Perfect for beginners.',
    'Water sparingly, every 2-3 weeks. Highly drought-tolerant.',
    'Low to bright indirect light',
    NULL
),
(
    'Fiddle Leaf Fig',
    'Ficus lyrata',
    'A popular indoor tree featuring large, heavily veined, violin-shaped leaves.',
    'Water thoroughly when the top inch of soil feels dry. Sensitive to overwatering.',
    'Bright consistent sunlight',
    NULL
);

INSERT INTO user_plants
(user_id, catalog_id, custom_name, location, last_watered)
VALUES
(1, 1, 'Monty the Monstera', 'Living Room', '2026-06-20'),
(2, 2, 'Sidney', 'Bedroom', '2026-06-10'),
(3, 3, 'Figgy Smalls', 'Balcony', '2026-06-23');

INSERT INTO reminders
(user_plant_id, reminder_type, frequency_days, next_due_date, is_completed)
VALUES
(1, 'Water', 10, '2026-06-30', 0),
(2, 'Fertilizer', 30, '2026-07-10', 0),
(3, 'Water', 7, '2026-06-25', 1);

INSERT INTO favorites
(user_id, catalog_id)
VALUES
(2, 1),
(2, 2),
(3, 1);

-- -----------------------------------------------------
-- Verification Queries
-- -----------------------------------------------------

SELECT * FROM users;
SELECT * FROM plant_catalog;
SELECT * FROM user_plants;
SELECT * FROM reminders;
SELECT * FROM favorites;