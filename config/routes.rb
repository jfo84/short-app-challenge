Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  require 'resque/server'
  mount Resque::Server, at: '/admin/jobs'

  get '/' => 'application#index'
  get '/top_urls' => 'short_urls#index'
  post '/' => 'short_urls#create'
  get '/*id' => 'short_urls#show'
end
