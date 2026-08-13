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

ALTER TABLE plant_catalog
ADD UNIQUE INDEX uq_plant_catalog_common_name (common_name);
INSERT INTO plant_catalog
    (common_name, scientific_name, description, watering_guide, sunlight_req, image_url)
VALUES
(
    'Snake Plant',
    'Dracaena trifasciata',
    'A hardy indoor plant known for its upright leaves and ability to tolerate low light.',
    'Water when the soil is completely dry. Avoid overwatering.',
    'Low to bright indirect',
    'https://images.unsplash.com/photo-1593482892290-f54927ae2e04'
),
(
    'Peace Lily',
    'Spathiphyllum',
    'A popular indoor plant with dark green leaves and elegant white flowers.',
    'Water when the top 1 inch of soil feels dry. Keep the soil slightly moist.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee'
),
(
    'Monstera',
    'Monstera deliciosa',
    'A tropical houseplant recognized by its large leaves with natural splits and holes.',
    'Water when the top 2 inches of soil are dry. Reduce watering during cooler months.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1614594975525-e45190c55d0b'
),
(
    'Spider Plant',
    'Chlorophytum comosum',
    'An easy-to-grow houseplant that produces long leaves and small plantlets.',
    'Water when the top inch of soil becomes dry. Avoid leaving the roots in standing water.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1572688484438-313a6e50c333'
),
(
    'Pothos',
    'Epipremnum aureum',
    'A fast-growing trailing plant that is popular for shelves, hanging baskets, and indoor spaces.',
    'Water when the top 1–2 inches of soil are dry.',
    'Low to bright indirect',
    'https://images.unsplash.com/photo-1614594576655-5c7c0e7e1a89'
),
(
    'Aloe Vera',
    'Aloe barbadensis miller',
    'A succulent plant with thick leaves that store water and require relatively little maintenance.',
    'Allow the soil to dry completely between waterings.',
    'Bright direct',
    'https://images.unsplash.com/photo-1509423350716-97f9360b4e09'
),
(
    'Rubber Plant',
    'Ficus elastica',
    'A decorative indoor tree with large, glossy leaves that can grow well in bright indoor spaces.',
    'Water when the top 1–2 inches of soil are dry. Do not keep the soil waterlogged.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1509423350716-97f9360b4e09'
),
(
    'ZZ Plant',
    'Zamioculcas zamiifolia',
    'A low-maintenance plant with glossy leaves that can tolerate periods of drought.',
    'Allow the soil to dry completely before watering again.',
    'Low to bright indirect',
    'https://images.unsplash.com/photo-1632207691144-7e710d7c0c7e'
),
(
    'Fiddle Leaf Fig',
    'Ficus lyrata',
    'A popular decorative plant with large violin-shaped leaves.',
    'Water when the top 2–3 inches of soil are dry. Avoid excessive watering.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1597055181300-ae627a1c2c6c'
),
(
    'Boston Fern',
    'Nephrolepis exaltata',
    'A lush fern with arching fronds that prefers humid environments.',
    'Keep the soil consistently moist but not waterlogged. Do not allow it to dry out completely.',
    'Indirect',
    'https://images.unsplash.com/photo-1596724878582-76c8e20e3d0e'
),
(
    'Lavender',
    'Lavandula angustifolia',
    'A fragrant flowering plant known for its purple flowers and distinctive aroma.',
    'Allow the soil to dry between waterings. Avoid excessive moisture.',
    'Full sun',
    'https://images.unsplash.com/photo-1499002238440-d264edd596ec'
),
(
    'Basil',
    'Ocimum basilicum',
    'A popular culinary herb with fragrant leaves that grows well in warm, sunny conditions.',
    'Water when the top inch of soil feels dry. Keep the soil evenly moist.',
    'Full sun',
    'https://images.unsplash.com/photo-1618375569909-3c8616cf7733'
),
(
    'Rosemary',
    'Salvia rosmarinus',
    'A fragrant herb with needle-like leaves commonly used in cooking.',
    'Allow the soil to dry between waterings. Avoid overwatering.',
    'Full sun',
    'https://images.unsplash.com/photo-1515586000433-45406d8e6662'
),
(
    'Jade Plant',
    'Crassula ovata',
    'A small succulent with thick leaves that stores water and can live for many years.',
    'Allow the soil to dry completely before watering.',
    'Bright direct',
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc'
),
(
    'Calathea',
    'Calathea orbifolia',
    'A tropical houseplant known for its large patterned leaves and preference for humid environments.',
    'Keep the soil lightly moist but never waterlogged. Avoid letting it dry completely.',
    'Bright indirect',
    'https://images.unsplash.com/photo-1616763355548-1b606f439f86'
)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  watering_guide = VALUES(watering_guide),
  sunlight_req = VALUES(sunlight_req),
  image_url = VALUES(image_url);