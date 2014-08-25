class Enroll < ActiveRecord::Base
  attr_accessible :name,:school,:major,:year,:cellphone,:email,:image,:videoUrl,:videoInfo,:topic
end
