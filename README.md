# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

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
