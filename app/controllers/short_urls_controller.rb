class ShortUrlsController < ApplicationController
  # Since we're working on an API, we don't have authenticity tokens
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @short_url = ShortUrl.create!(full_url: full_url)

    render json: { short_code: @short_url.short_code }, status: :created
  rescue ActiveRecord::RecordInvalid => error
    render json: { error: error.message }, status: :bad_request
  end

  def show
  end

  private

  def full_url
    params.require(:full_url)
  end

end
