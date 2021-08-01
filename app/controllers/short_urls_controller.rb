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
    @short_url = ShortUrl.find_by_short_code(short_code)

    if @short_url.present?
      redirect_to(@short_url.full_url)
    else
      render json: { error: 'No valid redirect found' }, status: :not_found
    end
  end

  private

  def short_code
    params.require(:id)
  end

  def full_url
    params.require(:full_url)
  end

  def humanize_errors
    @short_url.errors.map do |attribute, error_message|
      "#{attribute.to_s.humanize} #{error_message}"
    end
  end

end
