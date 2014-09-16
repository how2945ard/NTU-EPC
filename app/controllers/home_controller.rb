class HomeController < ApplicationController
  require 'net/http'
  def index
  end

  def get_enroll
  end

  def show
  end

  def bulletin
  end

  def getYoutube
    result = Net::HTTP.get(URI.parse('https://gdata.youtube.com/feeds/api/videos/'+params[:id]+'?alt=json'))
    render json: result
  end
end
