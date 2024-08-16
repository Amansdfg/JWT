create table if not exists users (
                       id                    bigserial,
                       username              varchar(30) not null unique,
                       password              varchar(80) not null,
                       first_name              varchar(80) not null,
                       last_name              varchar(80) not null,
                       email                 varchar(50) not null ,
                       primary key (id)
);

create table if not exists  roles (
                       id                    serial,
                       name                  varchar(50) not null,
                       primary key (id)
);

CREATE TABLE if not exists  users_roles (
                             users_id               bigint not null,
                             roles_id               int not null,
                             primary key (users_id, roles_id),
                             foreign key (users_id) references users (id),
                             foreign key (roles_id) references roles (id)
);

insert into roles (name)
values
    ('ROLE_USER'), ('ROLE_ADMIN');

insert into users (username, password, email,first_name,last_name)
values
    ('user', '$2a$12$jcMLNqhHTEw7whvWxJiA1OZ5MmD4jXB/ufXhSAxmYokgyqb3DkDa2
', 'user@gmail.com','User','Userov'),
    ('admin', '$2a$12$jcMLNqhHTEw7whvWxJiA1OZ5MmD4jXB/ufXhSAxmYokgyqb3DkDa2
', 'admin@gmail.com','Admin','Adminov');

insert into users_roles (users_id, roles_id)
values
    (1, 1),
    (2, 2);