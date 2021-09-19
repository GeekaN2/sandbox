# loop through all files in current directory
IFS=$'\n'
cat ./templates.csv | while read template; do 
    echo "$template";

    IFS=$'\n'; set -f
    findFiles="find  ./ -name " + "$template"

    for f in $($findFiles); do 
        echo "$f";
    done

    unset IFS; set +f
done

