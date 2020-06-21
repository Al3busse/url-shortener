# API Project: URL Shortener Microservice for freeCodeCamp

## [Live demo (made with glitch.me)](https://al3busse-url-shortener.glitch.me/)

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1592697500806}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. _HINT_: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example:

POST https://al3busse-url-shortener/api/shorturl/new - body (urlencoded) : url=https://www.google.com

#### Usage:

[https://al3busse-url-shortener.glitch.me/api/shorturl/1592697500806](https://al3busse-url-shortener.glitch.me/api/shorturl/1592697500806)

#### Will redirect to:

[https://www.google.com](https://www.google.com)

### Author

**Alejandro Busse** - [Al3busse](https://github.com/Al3busse)
