class Enroll < ActiveRecord::Base
	belongs_to :user
	validates :name, presence: true
	validates :school, presence: true
	attr_accessible :name,:school,:major,:year,:cellphone,:email,:image,:videoUrl,:videoInfo,:topic,:user_id
end
