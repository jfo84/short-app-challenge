require 'open-uri'

class UpdateTitleJob < ApplicationJob
  queue_as :default

  def perform(short_url_id)
    short_url = ShortUrl.find(short_url_id)

    title = URI.open(short_url.full_url) do |file_handle|
      doc = Nokogiri::HTML(file_handle)
      doc.at_css('title').text
    end

    short_url.update_attribute(:title, title)
  rescue SocketError
    short_url.update_attribute(:title, 'Failed to fetch title')
  end
end
