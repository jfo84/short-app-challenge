class ShortUrl < ApplicationRecord
  validates :full_url, presence: true
  validate :validate_full_url

  def short_code
    return nil unless id.present?

    num = id - 1

    Base62.encode(num)
  end

  def update_title!
  end

  private

  def validate_full_url
  #   uri = URI.parse(value)
  #   uri.is_a?(URI::HTTP) && uri.host.present?
  # rescue
  #   errors.add(:full_url, "Full url is not a valid url")
  end

end
