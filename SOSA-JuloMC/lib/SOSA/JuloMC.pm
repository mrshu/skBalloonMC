
use 5.014;
use strict;
use warnings;

package SOSA::JuloMC;
use Dancer ':syntax';
use JSON;
use Data::Dumper;

our $VERSION = '0.1';

my $file = path(dirname($0), '..', 'tmp.json');
open FILE, "$file";
binmode FILE;

local $/ = undef;
my $str = <FILE>;
my $j = decode_json $str;

get '/' => sub {
    template 'index';
};

get '/api/:id' => sub {
    my $id = params->{id};
    return encode_json @{$j}[$id];
};



true;
