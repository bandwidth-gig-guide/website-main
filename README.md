# Main Website

This repository defines the main public-facing website for the gig guide.

## Running Locally

Run the following command to start the project.

```sh
docker compose up -d --build
```

The application is accessible through a reverse proxy on [localhost](https://localhost):

Hot reloading is enabled for local development.

The reverse proxy serves the project on HTTPS, to better simulate the live environment in order to better identify and Mixed Content issues early. The browser will likely flag this as `not secure`. This is safe to ignore.