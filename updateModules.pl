#!/usr/bin/perl
use strict;
use warnings;
use File::Basename;

my $minifyCommand = 'uglifyjs "%s"';
my $moduleDest = 'chrome/content/scaffold/modules.js';

my $moduleVersionFile = 'modules'; # colon delimited file in the form version:commit:name:shortName:pathToModule.js
open MODULES, '<', $moduleVersionFile or die "Could not open modules file '$moduleVersionFile': $!";
open MODULES_OUT, '>', "$moduleVersionFile.tmp" or die "Could not open a temporary modules file '$moduleVersionFile.tmp' for writing: $!";
binmode MODULES_OUT; # newlines should always be \n, never \r\n

my $scaffoldFile;

while(<MODULES>) {
	chomp;
	if(!$_) { next; }
	
	my ($version, $commit, $name, $sName, $path) = split(/:/, $_);
	
	# retrieve current commit for module
	my $currentCommit = `cd "${\( dirname($path) )}" && git rev-parse --short HEAD`;
	chomp($currentCommit);
	if($currentCommit eq $commit) {
		print MODULES_OUT "$_\n";
		print "$name is up to date at commit $commit\n";
		next;
	}
	
	print "Updating module $name. Old version at commit $commit, new version at $currentCommit\n";
	
	# minify
	my $code = `${\( sprintf($minifyCommand, $path) )}`;
	$code =~ s/[\\"]/\\$&/g;
	
	# replace module in Scaffold
	$version++;
	my $startMark = "/* $sName START */";
	my $endMark = "/* $sName END */\n";
	my $replace = <<END;
$startMark
	{
		name: "$name",
		shortName: "$sName",
		version: "$version",
		commit: "$currentCommit",
		code: "$code"
	}, $endMark
END
	chomp($replace);
	
	if(!$scaffoldFile) {
		local $/ = undef;
		open SCAFFOLD_MODULES, $moduleDest or die "Could not open Scaffold modules file '$moduleDest': $!";
		$scaffoldFile = <SCAFFOLD_MODULES>;
		close SCAFFOLD_MODULES;
	}
	
	( $scaffoldFile =~ s/\Q$startMark\E.+\Q$endMark\E/$replace/s ) or
		# no replacement happened, append to the begining of list
		( $scaffoldFile =~ s/(?<=^var modules = \[\n)/\t$replace\n/ ) or
		# something is messed up
		die "Could not parse Scaffold modules file";
	
	# update modules file
	print MODULES_OUT join(':', ($version, $currentCommit, $name, $sName, $path)) . "\n";
}
close MODULES_OUT;
close MODULES;

if($scaffoldFile) {
	# something was replaced, write back to file
	open SCAFFOLD_MODULES, '>', $moduleDest or die "Could not open Scaffold modules file '$moduleDest': $!";
	binmode SCAFFOLD_MODULES; # proper newlines on Windows
	print SCAFFOLD_MODULES $scaffoldFile;
	close SCAFFOLD_MODULES;
}

# rename temp modules file
unlink $moduleVersionFile;
rename "$moduleVersionFile.tmp", $moduleVersionFile;