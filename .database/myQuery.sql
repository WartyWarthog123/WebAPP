-- Create the new table for EA game's
CREATE TABLE ea_games(
    game_id INTEGER NOT NULL PRIMARY KEY,
    game_name TEXT NOT NULL,
    game_genre TEXT NOT NULL,
    game_devs INTEGER NOT NULL,
    game_series TEXT NOT NULL,
    release_date TEXT NOT NULL
);


-- Insert sample data for EA Games
INSERT INTO ea_games (game_name, game_genre, game_devs, game_series, release_date) VALUES
('The Sims 4', 'Life Simulation', 'Maxis', 'The Sims', '2014'),
('The Sims 3', 'Life Simulation', 'Maxis', 'The Sims', '2009'),
('Madden NFL 24', 'Sports', 'EA Tiburon', 'Madden NFL', '2023'),
('Madden NFL 23', 'Sports', 'EA Tiburon', 'Madden NFL', '2022'),
('FIFA 23', 'Sports', 'EA Vancouver', 'FIFA', '2022'),
('NBA Live Mobile', 'Sports', 'EA Sports', 'NBA Live', '2022'),
('Apex Legends', 'Battle Royale', 'Respawn Entertainment', 'Apex Legends', '2019'),
('Star Wars: The Old Republic', 'MMORPG', 'BioWare', 'Star Wars', '2011'),
('Dead Space', 'Survival Horror', 'Visceral Games', 'Dead Space', '2008'),
('Dead Space Remake', 'Survival Horror', 'Motive Studio', 'Dead Space', '2023'),
('Titanfall', 'First Person Shooter', 'Respawn Entertainment', 'Titanfall', '2014'),
('Titanfall 2', 'First Person Shooter', 'Respawn Entertainment', 'Titanfall', '2016'),
('Battlefield 3', 'First Person Shooter', 'DICE', 'Battlefield', '2011'),
('Battlefield 4', 'First Person Shooter', 'DICE', 'Battlefield', '2013'),
('Battlefield 1', 'First Person Shooter', 'DICE', 'Battlefield', '2016'),
('Star Wars Jedi: Fallen Order', 'Action-Adventure', 'Respawn Entertainment', 'Star Wars Jedi', '2019'),
('Star Wars Jedi: Survivor', 'Action-Adventure', 'Respawn Entertainment', 'Star Wars Jedi', '2023'),
('Plants vs. Zombies: Battle for Neighborville', 'Third Person Shooter', 'PopCap Games', 'Plants vs. Zombies', '2019'),
('Plants vs. Zombies: Garden Warfare 2', 'Third Person Shooter', 'PopCap Games', 'Plants vs. Zombies', '2016'),
('Star Wars Battlefront', 'First Person Shooter', 'DICE', 'Star Wars: Battlefront', '2015'),
('Star Wars Battlefront II', 'First Person Shooter', 'DICE', 'Star Wars: Battlefront', '2017'),
('Need for Speed Unbound', 'Racing', 'Criterion Games', 'Need for Speed', '2022'),
('Need for Speed Heat', 'Racing', 'Ghost Games', 'Need for Speed', '2019'),
('Dragon Age: Inquisition', 'RPG', 'BioWare', 'Dragon Age', '2014'),
('Mass Effect 2', 'Action RPG', 'BioWare', 'Mass Effect', '2010'),
('Mass Effect 3', 'Action RPG', 'BioWare', 'Mass Effect', '2012');



