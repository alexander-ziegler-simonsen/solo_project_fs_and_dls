
echo "building Docker images..."

Docker build -t my-mongo ../docker/mongodb
Docker build -t my-rabbitmq ../docker/rabbitmq
Docker build -t my-postgres ../docker/postgres

echo "adding it to minikube.."

minikube image load my-mongo
minikube image load my-rabbitmq
minikube image load my-postgres

echo "converting docker compose to kubernetes YAML, with Kompose and putting all them in a folder called 'k8s/'"
kompose convert --out k8s/

echo "done building and converting."