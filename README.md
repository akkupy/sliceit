# SliceIt !

![sliceit_home](https://github.com/akkupy/sliceit/assets/69421964/f4e4b891-6e79-4c92-92ce-4224bbcf56e7)

A URL Shortner Made on Django Framework with Open API Support.

Visit the site at https://sliceit.me

## Refer the Main Development Branch [here](https://github.com/akkupy/sliceit)

## API Documentation

### Slice a Link [GET Request].

```
https://sliceit.me/api/slice/
```
#### Query Params

* backhalf - The Back-Half part of the URL after the / .

    eg:sliceit.me/akash

* url - URL that is needed to be shortened.

EXAMPLE :

```
https://sliceit.me/api/slice/?backhalf=akash&url=https://akkupy.me
```

OUTPUT :

```json
{
    "stat": "true",
    "result": {
        "code": "akash",
        "short_url": "sliceit.me/akash",
        "full_short_url": "https://sliceit.me/akash",
        "target_url": "https://akkupy.me"
    }
}
```
ERRORS :

* Backhalf Already Used.

```json
{
    "stat": "false",
    "result": "backhalf already used."
}
```
* Invalid URL

```json
{
    "stat": "false",
    "result": "invalid url"
}
```

### Delete a Link [GET Request].

```
https://sliceit.me/api/remove/
```

#### Query Params

* code - The code returned during slicing AKA Back-Half.

    eg:sliceit.me/akash -> code is akash


EXAMPLE :

```
https://sliceit.me/api/remove/?code=akash
```

OUTPUT :

```json
{
    "stat": "true",
    "result": "link deleted"
}
```
ERRORS :

* Invalid Code.

```json
{
    "stat": "false",
    "result": "invalid"
}
```

* Trying to delete User Authenticated Link/Code.

```json
{
    "stat": "false",
    "result": "forbidden"
}
```

## Production Deployment On Vercel.

* Fork the production branch of the Repository.

* Make necessary changes in the code(change the occurance of https://sliceit.me or sliceit.me to your domain name.)

* Setup a PostgreSQL [here](https://supabase.com/) or anywhere publicly available.

* Connect your github to vercel.

* Import the forked repository into vercel.

* Use a suitable project name and make other settings as default.

* Configure Environment Variables as shown below.

* Hit Deploy!

* (Optional) Assign a Custom Domain Name.

## Enviroment Variables 

```
 [-] DJANGO_SECRET_KEY = ''
 [-] BASE_URL = ''
 [-] DB_USER = ''
 [-] DB_NAME = ''
 [-] DB_PORT = ''
 [-] DB_HOST = ''
 [-] DB_PASSWORD = ''
```

* DJANGO_SECRET_KEY - Enter the Django Project Secret Key.(Generate random key [here](https://djecrety.ir/)).

* BASE_URL - Base URL of the deployment. Eg: sliceit.me

* DB_USER - PostgreSQL Username

* DB_NAME - PostgreSQL Name

* DB_PORT - PostgreSQL Port Number

* DB_HOST - PostgreSQL Host

* DB_PASSWORD - PostgreSQL Password

## Contact Me
 [![telegram](https://img.shields.io/badge/Akku-000000?style=for-the-badge&logo=telegram)](https://t.me/akkupy)

