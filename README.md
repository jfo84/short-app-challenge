# Intial Setup

    docker-compose build
    docker-compose up mariadb
    # Once mariadb says it's ready for connections, you can use ctrl + c to stop it
    docker-compose run short-app rails db:migrate
    docker-compose -f docker-compose-test.yml build

# To run migrations

    docker-compose run short-app rails db:migrate
    docker-compose -f docker-compose-test.yml run short-app-rspec rails db:test:prepare

# To run the specs

    docker-compose -f docker-compose-test.yml run short-app-rspec

# Run the web server

    docker-compose up

# Adding a URL

    curl -X POST -d "full_url=https://google.com" http://localhost:3000/short_urls.json

# Getting the top 100

    curl localhost:3000

# Checking your short URL redirect

    curl -I localhost:3000/abc

# Algorithm

    The test cases required it, but generally speaking the "correct" way to shorten URLs is with base62 encoding. If you google around a bit, you find that big tech uses this type of encoding with a stream cipher to generate unique short codes. The choice makes logical sense because 62 is a high enough base value that you will reach your database's limit for unsigned integer values within 10 or 11 characters, while something like hexadecimal will still have quite large URLs if you have a large number of records in the system. You also don't have to worry too much about odd characters that could invalidate your URL if you use a larger character set. I used [this library](https://github.com/steventen/base62-rb) as a reference implementation.
