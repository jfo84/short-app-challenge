class ShortUrlsController < ApplicationController
  # Since we're working on an API, we don't have authenticity tokens
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @short_url = ShortUrl.new(full_url: full_url)

    if @short_url.save
      render json: { short_code: @short_url.short_code }, status: :created
    else
      render json: { errors: humanize_errors }, status: :bad_request
    end
  end

  def show
  end

  private

  def full_url
    params.require(:full_url)
  end

  def humanize_errors
    @short_url.errors.map do |attribute, error_message|
      "#{attribute.to_s.humanize} #{error_message}"
    end
  end

end
