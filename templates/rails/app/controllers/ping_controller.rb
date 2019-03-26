class PingController < ApplicationController

  def ping
    render json: {message: 'pong'}
  end

  def post_ping
    render json: {message: 'post pong'}
  end
end
