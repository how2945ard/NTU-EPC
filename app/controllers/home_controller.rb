class HomeController < ApplicationController
	def index
	end

	def get_enroll
	end

	def show
	end

	def indi
		@enroll = Enroll.find(params[:id])
	end
end
