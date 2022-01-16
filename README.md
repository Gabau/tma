# Task Management Application

Name: Au Chen Xi, Gabriel  
Matriculation Number: A0217970Y




## Dependencies

* Ruby version: 3.0.3
* Rails: 6.1.4.4

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## PostGresql dependencies

Uses postgresql.

Create a user named tma, or change the user in `config/database.yml`.

Update password using the `TMA_DATABASE_PASSWORD` environment variable to
the password that postgresql is using, by adding the following command to
`.bashrc` assuming use of bash.

```bash
export TMA_DATABASE_PASSWORD=${some_password}
```

Change unix domain through pg_hba conf to md5.

e.g.
```bash
sudo nano /etc/postgresql/13/main/pg_hba.conf
```

and change the following line.

```
local   all             all                                peer
```

to

```
local   all             all                                md5
```

run the following to restart psql.

```
sudo service postgresql restart
```


Installation instructions:

```bash
bin/bundle install
bin/rails yarn:install
```

Serve with

```
rails s
```
