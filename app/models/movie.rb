class Movie < ApplicationRecord
    validates_presence_of :name
    has_many :actors, dependent: :destroy
end
