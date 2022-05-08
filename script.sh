chart_url="$1"
items_count=$2

website_data=$(curl $chart_url)
echo $website_data

