#!/bin/bash
# loop through all files in current directory

hashedPassword="2c8e2a73a7f870edeb0453ef2e85720676674a0399abb5827aa5f447f0a2ade6"

# Script help
if [[ "$1" =~ ^-h|--help$ ]] ; then
    echo "Usage: `basename $0` [-h] [-p|--password=<string>]
  -p | --password : Password to allow reading files
"
    exit 0
fi

# Script arguments
for i in "$@"
do
case $i in
    -p=*|--password=*)
    password="${i#*=}"
    ;;
esac
done

# Take access to files
function banread {
    IFS=$'\n'
    cat ./templates.csv | while read template; do
        findFiles="find . -name ${template}"
        
        for f in $(eval "$findFiles"); do
            chmod 700 "$f";
            sudo chflags -R simmutable "$f";
            echo "Ban read: $f";
        done
    done
    unset IFS;
}

# Returning access to files
function unbanread {
    IFS=$'\n'
    cat ./templates.csv | while read template; do
        findFiles="find . -name ${template}"
        
        for f in $(eval "$findFiles"); do
            sudo chflags -R nosimmutable "$f";
            chmod 777 "$f";
            echo "Unban read: $f";
        done
    done
    unset IFS;
}

pass=$(echo "$password" | shasum -a 256)

# Comparing passwords
if [[ "${pass:0:64}" == "$hashedPassword" ]]; then
    unbanread
else
    banread
fi
