class ShortUrl < ApplicationRecord
  validate :validate_full_url

  def short_code
    return nil if !persisted?

    num = id - 1

    Base62.encode(num)
  end

  def update_title!
  end

  private

  def validate_full_url
  end

end
