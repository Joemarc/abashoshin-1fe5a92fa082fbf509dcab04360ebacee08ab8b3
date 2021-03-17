require 'api_constraints'

Rails.application.routes.draw do
  root 'welcome#app'

  namespace :forest do
    post '/actions/lock' => 'users#lock'
    post '/actions/publish_article' => 'articles#publish_article'
    post '/actions/delete_picture' => 'pictures#delete_picture'
    post '/actions/republish_article' => 'articles#republish_article'
  end
  mount ForestLiana::Engine => '/forest'

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    passwords: 'passwords',
    sessions: 'sessions',
    omniauth_callbacks: 'omniauth'
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :articles, only: %i[index show] do
        resources :comments, only: %i[index create]
        collection do
          get :top
          get :headline
        end
      end
      resources :videos, only: %i[index show] do
        resources :comments, only: %i[index create]
      end
      resources :comments, only: %i[update destroy]
      resources :users
      resources :formations, only: %i[index show] do
        collection do
          get :modules
        end
      end
    end
  end
  match '*path', to: 'welcome#app', via: :all
end
