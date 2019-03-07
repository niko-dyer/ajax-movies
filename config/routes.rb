Rails.application.routes.draw do
  root 'movies#index'

  get 'movie_form', to: 'movies#form'

  resources :movies do
    resources :actors
  end
end
