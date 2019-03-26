class Api::ShopsController < ApplicationController
  before_action :authenticate_user!, only: %i[update]

  def update
    current_user
      .shop
      .update(name: shop_params[:name], slug: shop_params[:name].gsub(' ', '-'))
      
    render json: {
      shop: current_user.shop.as_json,
      products: current_user.shop.products
    }
  end

end
