class Api::UsersController < ApplicationController
  after_action :update_auth_header, only: [:create] # devise callback, not working...

  def create
    render json: { message: 'Successful creation, please login', user: User.create!(create_user_attributes) }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: "Could not create user #{e.message}" }, status: :unprocessable_entity
  end

  private

  def create_user_attributes
    params
      .require(:user)
      .permit(:name, :password, :password_confirmation, :email, :kind)
  end

  def sign_in_params
    params.require(:user).permit(:password, :email)
  end
end
