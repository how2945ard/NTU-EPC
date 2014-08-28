class Enroll < ActiveRecord::Base
	validates :name, presence: true
	validates :school, presence: true
	attr_accessible :name,:school,:major,:year,:cellphone,:email,:image,:videoUrl,:videoInfo,:topic
end
