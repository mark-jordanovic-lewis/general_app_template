class Api::ProductsController < ApplicationController
  before_action :product, only: %i[show purchase]

  def index
    render json: Product
                  .paginate(pagination_params)
                  .as_json(only: %i(id name image price)),
           status: :ok
  end

  def show
    if product
      render json: product.as_json(only: %i(id name image price available releasedate description)),
             status: :ok
    else
      render json: { message: "Could not find product #{product_id}" }, status: :unprocessible
    end
  end

  # super simple no money back guarantee - no money at all!
  def purchase
    if product.purchase
      render json: { message: "You have bought one #{product.name}" }, status: :ok
    else
      release json: { message: "You cannot buy #{product.name}" }, status: :unprocessible
    end
  end

  private

  def pagination_params
    params.require(:paginate).permit(:per_page, :page).to_h
  end

  def product_id
    params.require(:product_id)
  end

  def product
    @product ||= Product.find(product_id)
  end

end
