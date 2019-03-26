module Signagestore
  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    # this needs tightening up for a prod app
    allow do
        origins '*'
        resource '*',
          headers: :any,
          expose:  ['access-token', 'expiry', 'token-type', 'uid', 'client'],
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
end
