-- Create the new table for EA game's
CREATE TABLE ea_games(
    game_id INTEGER NOT NULL PRIMARY KEY,
    game_name TEXT NOT NULL,
    game_genre TEXT NOT NULL,
    game_devs INTEGER NOT NULL,
    game_series TEXT NOT NULL,
    release_date TEXT NOT NULL
);


-- Insert sample data for English Premier League (Top 10)
INSERT INTO ea_games (game_name, game_genre, game_devs, game_series, release_date) VALUES
('Battlefield 6', 'First Person Shooter', 'DICE', 'Battlefield', '2025'),
('Battlefield 2042', 'First Person Shooter', 'DICE', 'Battlefield', '2021'),
('Battlefield 5', 'First Person Shooter', 'DICE', 'Battlefield', '2018'),
('Battlefront 1', 'First Person Shooter', 'DICE', 'Star Wars: Battlefront', '2015'),
('Battlefront 2', 'First Person Shooter', 'DICE', 'Star Wars: Battlefront', '2017');

