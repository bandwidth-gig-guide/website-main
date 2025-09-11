# website-main

This repository defines the main public-facing website for the gig guide.

## Running Locally

```sh
docker compose up -d --build
```

The application is accessible through a reverse proxy on `localhost`:

- Main site: `localhost`
- Admin site: `admin.localhost`

Hot reloading is partially supported. Changes require a browser refresh to appear.