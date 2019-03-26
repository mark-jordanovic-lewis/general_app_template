# SinageStore
Developed for a code test interview stage
## Pre-requisites
- ruby - I'm on 2.6.1 but nothing magic is going on
- rails - whichever ruby gems happen to be using right now...
- postgresql - I'm on 11.0 but nothing magic is in this repo
- a recent npm for installing angular2
- a passenger enabled nginx install:
  ```
    $ gem install passenger
    $ passenger-install-nginx-module
  ```
  then add the new executable path to the `engine` script.


## Build Instructions
#### The overall app (top level dir)
- in `config/nginx.conf` the `passenger_root` needs to be the exact executable for passenger, not a shim.
- don't run `rails_init`, it builds an nginx, angular, rails app with devise_token_auth to start from scratch
  using the `templates`.
#### Rails
The app is ready for development mode, not for any other environment.
- Run:
  ```bash
    $ bundle
    $ bundle exec rails db:create db:migrate db:seed
  ```
  in the signagestore dir
#### Angular
- Run:
  ```bash
    $ npm install
    $ ng build --optimize --aot
  ```

## Operating the app
- To start run:
  ```bash
    $ sudo ./engine start
  ```
- To stop run:
  ```bash
    $ sudo ./engine stop
  ```
