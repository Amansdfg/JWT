CREATE TABLE IF NOT EXISTS users (
                                     id          BIGSERIAL PRIMARY KEY,
                                     username    VARCHAR(30) NOT NULL UNIQUE,
                                     password    VARCHAR(80) NOT NULL,
                                     first_name  VARCHAR(80) NOT NULL,
                                     last_name   VARCHAR(80) NOT NULL,
                                     email       VARCHAR(50) NOT NULL,
                                     reset_token VARCHAR(50) NOT NULL,
                                     photo       VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS roles (
                                     id   SERIAL PRIMARY KEY,
                                     name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_roles (
                                           users_id BIGINT NOT NULL,
                                           roles_id INT NOT NULL,
                                           PRIMARY KEY (users_id, roles_id),
                                           FOREIGN KEY (users_id) REFERENCES users (id),
                                           FOREIGN KEY (roles_id) REFERENCES roles (id)
);

CREATE TABLE IF NOT EXISTS posts (
                                     id         SERIAL PRIMARY KEY,
                                     content    TEXT NOT NULL,
                                     created_at TIMESTAMP NOT NULL,
                                     photo_url  VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_posts (
                                           users_id BIGINT NOT NULL,
                                           posts_id INT NOT NULL,
                                           PRIMARY KEY (users_id, posts_id),
                                           FOREIGN KEY (users_id) REFERENCES users (id),
                                           FOREIGN KEY (posts_id) REFERENCES posts (id)
);
CREATE TABLE IF NOT EXISTS users_friends (
                                             users_id   BIGINT NOT NULL,
                                             friends_id BIGINT NOT NULL,
                                             PRIMARY KEY (users_id, friends_id),
                                             FOREIGN KEY (users_id) REFERENCES users (id),
                                             FOREIGN KEY (friends_id) REFERENCES users (id)
);

INSERT INTO roles (name)
VALUES
    ('ROLE_USER'),
    ('ROLE_ADMIN');

INSERT INTO users (username, password, email, first_name, last_name, photo, reset_token)
VALUES
    ('user', '$2a$12$w792I4G0SKlTb3ONzWQPvu2VO.IX7NNr6WngG1wPHKQ9dvx5L73/S', 'user@gmail.com', 'User', 'Userov', 'images/No-Photo.gif', 'token1'),
    ('admin', '$2a$12$w792I4G0SKlTb3ONzWQPvu2VO.IX7NNr6WngG1wPHKQ9dvx5L73/S', 'admin@gmail.com', 'Admin', 'Adminov', 'images/DSC02946.jpg', 'token2'),
    ('aman_kalabay', '$2a$12$w792I4G0SKlTb3ONzWQPvu2VO.IX7NNr6WngG1wPHKQ9dvx5L73/S', 'aman@gmail.com', 'Aman', 'Kalabay', 'images/No-Photo.gif', 'token3');


INSERT INTO posts (content, created_at, photo_url)
VALUES
    ('The markup syntax you’ve seen above is called JSX. It is optional, but most React projects use JSX for its convenience. All of the tools we recommend for local development support JSX out of the box.', '2024-09-01 19:55:31.947288', 'images/react1.webp'),
    ('Functions starting with use are called Hooks. useState is a built-in Hook provided by React. You can find other built-in Hooks in the API reference. You can also write your own Hooks by combining the existing ones.', '2024-09-01 19:56:16.030296', 'images/react2.png'),
    ('React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on components by Facebook Inc. It is maintained by Meta', '2024-09-01 19:57:30.185000', 'images/react3.webp'),
    ('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s', '2024-09-01 20:19:28.154000', 'images/videoAman.mp4'),
    ('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum i', '2024-09-01 20:20:42.428206', 'images/foodOne.jpeg'),
    ('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum i', '2024-09-01 20:21:49.471643', 'images/DSC02946.jpg');
INSERT INTO users_posts (users_id, posts_id)
VALUES
    (3, 1),
    (3, 2),
    (3, 3),
    (2, 4),
    (2, 5),
    (2, 6);
insert into users_friends(users_id, friends_id)
values (2,3),
       (3,2)