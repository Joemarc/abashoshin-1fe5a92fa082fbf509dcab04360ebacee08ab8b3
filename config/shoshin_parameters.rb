if Rails.env.development?
  BackWaiter::Application.config.x.shoshin_subdomain = 'api'
  BackWaiter::Application.config.x.shoshin_url = 'http://localhost:3000'
elsif Rails.env.staging?
  BackWaiter::Application.config.x.shoshin_url = 'https://staging.monsieur-jean.fr'
else
  BackWaiter::Application.config.x.shoshin_url = 'https://monsieur-jean.fr'
end