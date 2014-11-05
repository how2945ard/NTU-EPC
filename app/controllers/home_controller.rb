class HomeController < ApplicationController
  require 'net/http'
  def index
    @articles = Article.all
  end

  def get_enroll
  end

  def show
  end

  def bulletin
    @articles = Article.all
  end

  def getYoutube
    result = Net::HTTP.get(URI.parse('https://gdata.youtube.com/feeds/api/videos/'+params[:id]+'?alt=json'))
    render json: result
  end
end
