namespace :populate do
  desc "TODO"
  task movies: :environment do
    20.times do
      movie = Movie.create(name: Faker::Movies::HitchhikersGuideToTheGalaxy.planet, description: Faker::Space.star_cluster)
      5.times { Actor.create(name: Faker::GreekPhilosophers.name, movie_id: movie.id) }
    end
  end
end
