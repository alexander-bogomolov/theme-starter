require 'json'

module Sass::Script::Functions
    def timestamp()
        return Sass::Script::String.new(Time.now.to_s)
    end

    def banner()
        parsed = JSON.parse( IO.read('package.json') )

        time = Time.now
        build = time.to_s
        year = time.year.to_s

        banner =  "* Project: "+ parsed['title']
        banner += "\n"
        banner += "* Version: "+ parsed['version']
        banner += "\n"
        banner += "\n"

        banner += " * Author: "
        parsed['author'].each do |key, value|
            banner += value +" ";
        end
        banner += "* Homepage: "+ parsed['homepage']
        banner += "\n"
        banner += "* Copyright (c) "+ year +" "+ parsed['company']
        banner += "\n"
        banner += "\n"

        banner += "* Build: "+ build
        banner += "\n"

        Sass::Script::String.new(banner)
    end
end