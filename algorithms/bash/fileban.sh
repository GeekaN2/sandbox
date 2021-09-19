#!/bin/bash
# loop through all files in current directory

hashedPassword="9e5763031b54ca938ba75dcf32e82d6976d74204ceb3ef31c54a6213624c07f0"

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

function banread {
    IFS=$'\n'
    cat ./templates.csv | while read template; do
        echo "Ban read: $template";
        
        IFS=$'\n'; set -f
        findFiles="find . -name ${template}"
        
        for f in $(eval "$findFiles"); do
            chmod 700 "$f";
        done
        
        unset IFS; set +f
    done
}

function unbanread {
    IFS=$'\n'
    cat ./templates.csv | while read template; do
        echo "Unban read: $template";
        
        IFS=$'\n'; set -f
        findFiles="find . -name ${template}"
        
        for f in $(eval "$findFiles"); do
            chmod 777 "$f";
        done
        
        unset IFS; set +f
    done
}

pass=$(echo "$password" | sha256sum)

if [[ "${pass:0:64}" == "$hashedPassword" ]]; then
    unbanread
else
    banread
fi
