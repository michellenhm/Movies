CREATE TABLE favorites (
    id INT,
    title VARCHAR(50),
    vote_average FLOAT,
    poster_path VARCHAR(100),
    release_date DATE,
    original_language VARCHAR(50),
    folder_id INT,   -- add the foreign key column
    CONSTRAINT fk_folder FOREIGN KEY (folder_id) REFERENCES folders(id)
);

CREATE TABLE folders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);