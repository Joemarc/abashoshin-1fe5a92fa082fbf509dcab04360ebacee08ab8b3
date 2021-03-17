class Api::V1::FormationsController < ApplicationController
  def index
    require 'net/http'
    url = URI.parse('https://abashosh.learnybox.com/api/v2/formations/')
    request = Net::HTTP::Get.new(url.to_s)

    request["Authorization"] = "Bearer #{ENV['LEARNY_BOX_TOKEN']}"
    req_options = {
      use_ssl: url.scheme == 'https'
    }

    res = Net::HTTP.start(url.hostname, url.port, req_options) do |http|
      http.request(request)
    end

    response = JSON.parse(res.body)
    if response['status']
      render json: response['data']
    else
      render json: "can't reach learnybox"
    end
  end

  def show
    require 'net/http'

    formation_id = params[:formation_id]
    url_show = URI.parse("https://abashosh.learnybox.com/api/v2/formations/#{formation_id}")
    request = Net::HTTP::Get.new(url_show.to_s)
    request["Authorization"] = "Bearer #{ENV["LEARNY_BOX_TOKEN"]}"
    req_options = {
      use_ssl: url_show.scheme == 'https'
    }

    res = Net::HTTP.start(url_show.hostname, url_show.port, req_options) do |http|
      http.request(request)
    end

    response = JSON.parse(res.body)
    if response['status']
      render json: response['data'][0]
    elsif response['status'] == false
      render json: response['message']
    else
      render json: "can't reach learnybox"
    end
  end

  def modules
    require 'net/http'
    formation_id = params[:url_id]
    url = URI.parse("https://abashosh.learnybox.com/api/v2/formations/#{formation_id}/modules/")
    request = Net::HTTP::Get.new(url.to_s)
    request["Authorization"] = "Bearer #{ENV['LEARNY_BOX_TOKEN']}"
    req_options = {
      use_ssl: url.scheme == 'https'
    }

    res = Net::HTTP.start(url.hostname, url.port, req_options) do |http|
      http.request(request)
    end

    response = JSON.parse(res.body)
    if response['status']
      render json: response['data']
    else
      render json: "can't reach learnybox"
    end
  end

end
