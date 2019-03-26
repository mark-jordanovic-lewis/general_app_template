User.create!(email: 'a@b.com', password: '1234564789', kind: 1)
User.create!(email: 'b@b.com', password: '1234564789', kind: 2)

require_relative './seeds/products.rb'
