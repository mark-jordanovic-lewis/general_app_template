Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'ping', to: 'ping#ping'
  post 'ping', to: 'ping#post_ping'

  namespace 'api' do
    # PRODUCTS
    post '/product', to: 'products#show'
    post '/products', to: 'products#index'
    post '/purchase', to: 'products#purchase'
    # USERS
    post '/user/create', to: 'users#create'
    post '/user/profile', to: 'profile#user_profile'
    # SHOPS
    post '/shop/update', to: 'shops#update'
  end
end
