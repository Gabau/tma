Rails.application.routes.draw do
  namespace :api do
    get 'tag/index'
    get 'tag/create'
    get 'tag/show/:id', to: 'tag#show'
    get 'tag/destroy'
  end
  namespace :api do
    get 'tasks/index'
    post 'tasks/create'
    post 'tasks/edit/:id', to: 'tasks#edit'
    get 'tasks/show/:id', to: 'tasks#show'
    delete 'tasks/destroy/:id', to: 'tasks#destroy'
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
