create database sproutly_app_db;

use sproutly_app_db;

-- -----------------------------------------------------
-- Table `sproutly_app_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usersname` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usersname_UNIQUE` (`usersname` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sproutly_app_db`.`plant_catalog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plant_catalog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `common_name` VARCHAR(100) NOT NULL,
  `scientific_name` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `watering_guide` TEXT NULL,
  `sunlight_req` VARCHAR(50) NULL,
  `image_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sproutly_app_db`.`user_plants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_plants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `catalog_id` INT NULL,
  `custom_name` VARCHAR(100) NOT NULL,
  `location` ENUM("Living Room", "Balcony", "Kitchen", "Bedroom") NULL,
  `last_watered` DATE NULL,
  `image` VARCHAR(255) NULL,
  `date_added` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  INDEX `_idx1` (`catalog_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_plants_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_plants_plant_catalog`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `plant_catalog` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sproutly_app_db`.`reminders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reminders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_plant_id` INT NOT NULL,
  `reminder_type` ENUM("Water", "Fertilizer", "Prune", "Repot") NOT NULL,
  `frequency_days` INT NOT NULL,
  `next_due_date` DATE NOT NULL,
  `is_completed` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `_idx` (`user_plant_id` ASC) VISIBLE,
  CONSTRAINT ``
    FOREIGN KEY (`user_plant_id`)
    REFERENCES `user_plants` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sproutly_app_db`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `favorites` (
  `user_id` INT NOT NULL,
  `catalog_id` INT NOT NULL,
  INDEX `fk_favorites_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_favorites_plant_catalog_idx` (`catalog_id` ASC) VISIBLE,
  PRIMARY KEY (`user_id`, `catalog_id`),
  CONSTRAINT `fk_favorites_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_plant_catalog`
    FOREIGN KEY (`catalog_id`)
    REFERENCES `plant_catalog` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



INSERT INTO `users` (`usersname`, `email`, `password_hash`) VALUES
('rgalang', 'rgalang@gmail.com', 'testpassword');

INSERT INTO `users` (`usersname`, `email`, `password_hash`) VALUES
('testuser', 'testuser@gmail.com', 'testuserpassword'),
('testuser2', 'testuser2@gmail.com', 'testuser2password');

INSERT INTO `plant_catalog` (`common_name`, `scientific_name`, `description`, `watering_guide`, `sunlight_req`, `image_url`) 
VALUES 
('Monstera Deliciosa', 'Monstera deliciosa', 'Famous for its iconic leaf holes, this tropical plant adds a dramatic flair to any indoor space.', 'Water every 1-2 weeks, allowing the soil to dry out between waterings.', 'Bright indirect light', null),

('Snake Plant', 'Dracaena trifasciata', 'A hardy, low-maintenance plant known for its upright, sword-like leaves. Perfect for beginners.', 'Water sparingly, every 2-3 weeks. Highly drought-tolerant.', 'Low to bright indirect light', null),

('Fiddle Leaf Fig', 'Ficus lyrata', 'A popular indoor tree featuring large, heavily veined, violin-shaped leaves.', 'Water thoroughly when the top inch of soil feels dry. Sensitive to overwatering.', 'Bright consistent sunlight', null);

INSERT INTO `user_plants` (`user_id`, `catalog_id`, `custom_name`, `location`, `last_watered`) 
VALUES 
(2, 1, 'Monty the Monstera', 'Living Room', '2026-06-20'),
(3, 2, 'Sidney', 'Bedroom', '2026-06-10'),
(4, 3, 'Figgy Smalls', 'Balcony', '2026-06-23');

INSERT INTO `reminders` (`user_plant_id`, `reminder_type`, `frequency_days`, `next_due_date`, `is_completed`) 
VALUES 
(4, 'Water', 10, '2026-06-30', 0),
(5, 'Fertilizer', 30, '2026-07-10', 0),
(6, 'Water', 7, '2026-06-25', 1);

INSERT INTO `favorites` (`user_id`, `catalog_id`) 
VALUES 
(2, 1),
(2, 2),
(3, 1);

ALTER TABLE user_plants
ADD COLUMN image VARCHAR(255) NULL AFTER last_watered;

alter table users
rename column username to name;

select * from users;

select * from user_plants;

select * from plant_catalog;

select * from reminders;

select * from favorites;

delete from users where id = 2;






