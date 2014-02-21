require 'json'

module Sass::Script::Functions
    def timestamp()
        return Sass::Script::String.new(Time.now.to_s)
    end

    def header()
        parsed = JSON.parse( IO.read('package.json') )

        time = Time.now
        build = time.to_s
        year = time.year.to_s

        header = "* Project: "+ parsed['title'] +"\n"
        header = header + " * Version: "+ parsed['project_version'] +"\n"
        header = header + " * Build: "+ build +"\n"
        header = header + " * Homepage: "+ parsed['homepage'] +"\n"
        header = header + " * Copyright (c) "+ year +" "+ parsed['agency'] +"\n"

        header = header + " * Author: "
        parsed['author'].each do |key, value|
            header = header + value +" ";
        end

        return Sass::Script::String.new(header)
    end
end