DROP TABLE IF EXISTS links CASCADE;

CREATE TABLE links(
    id CHAR(10) PRIMARY KEY,
    original_link VARCHAR NOT NULL,
    link_marker CHAR(8) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW() 
)