class ApplicationController < ActionController::Base
	protect_from_forgery

	def get_current_user
		@user= current_user
		render json: JSON.parse(@user.to_json(:include=>:enroll))
	end

	private

	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end
	helper_method :current_user
end
