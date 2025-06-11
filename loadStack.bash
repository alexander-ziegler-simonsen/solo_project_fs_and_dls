set -o allexport # set export keyword in front
source .env
set +o allexport # remove export as front keyword
docker stack deploy -c compose-stack.yaml mystack