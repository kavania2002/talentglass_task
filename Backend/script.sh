chart_url="$1"
items_count=$2

# To Get output directly
# curl $chart_url | html2text


# Storing the output in the varaible website_data
website_data=$(curl $chart_url | html2text | sed -n '/Showing 250 Titles/,$p')
echo $website_data



