
echo "building Docker images..."

Docker build -t my-mongo:lastest ./docker/mongodb
Docker build -t my-rabbitmq:lastest ./docker/rabbitmq
Docker build -t my-postgres:lastest ./docker/postgres

echo "adding it to minikube.."

minikube image load my-mongo:lastest
minikube image load my-rabbitmq:lastest
minikube image load my-postgres:lastest

echo "converting docker compose to kubernetes YAML, with Kompose and putting all them in a folder called 'k8s/'"
kompose convert --out k8s/

echo "done building and converting."