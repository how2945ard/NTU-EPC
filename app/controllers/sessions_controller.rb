class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    user.email = env["omniauth.auth"].info.email
    user.image = env["omniauth.auth"].info.image
    user.save
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end