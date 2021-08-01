###
# Reference https://github.com/steventen/base62-rb/blob/master/lib/base62-rb.rb
#
module Base62
  CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".freeze
  CHARACTERS_HASH = CHARACTERS.each_char.with_index.inject({}) { |h, (k, v)| h[k] = v; h }
  RADIX = CHARACTERS.length

  def self.encode(num)
    return "0" if num == 0
    str = ""

    while num > 0
      str = CHARACTERS[num % RADIX] + str
      num = num / RADIX
    end

    str
  end

  def self.decode(str)
    num = 0
    i = 0
    len = str.length - 1

    while i < str.length
      pow = RADIX**(len - i)
      num += CHARACTERS_HASH[str[i]] * pow
      i += 1
    end

    num
  end
end
