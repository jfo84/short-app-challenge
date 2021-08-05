class ShortUrl < ApplicationRecord
  validates :full_url, presence: true
  validate :validate_full_url

  def self.find_by_short_code(sc)
    decoded_id = Base62.decode(sc) + 1

    find_by(id: decoded_id)
  end

  def public_attributes
    { 'title' => title, 'short_code' => short_code }
  end

  def short_code
    return nil unless id.present?

    num = id - 1

    Base62.encode(num)
  end

  def update_title!
    UpdateTitleJob.new.perform(id)

    reload
  end

  private

  def validate_full_url
    uri = URI.parse(full_url)

    unless uri.is_a?(URI::HTTP) && uri.host.present?
      errors.add(:full_url, "is not a valid url")
    end
  rescue
    errors.add(:full_url, "is not a valid url")
  end

end
