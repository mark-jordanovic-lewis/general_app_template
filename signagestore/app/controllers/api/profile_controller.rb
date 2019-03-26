class Api::ProfileController < ApplicationController
  before_action :authenticate_user!

  def user_profile
    render json: current_user.as_json
  end

  private

  def user_id
    params.require(:user_id)
  end
end
