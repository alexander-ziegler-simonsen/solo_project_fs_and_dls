
echo "pushing all the docker images to minikube.."

minikube image load ghcr.io/alexander-ziegler-simonsen/my-postgres
minikube image load ghcr.io/alexander-ziegler-simonsen/my-mongo
minikube image load ghcr.io/alexander-ziegler-simonsen/my-seeder
minikube image load ghcr.io/alexander-ziegler-simonsen/my-rabbitmq
minikube image load ghcr.io/alexander-ziegler-simonsen/my-client
minikube image load ghcr.io/alexander-ziegler-simonsen/my-api
minikube image load ghcr.io/alexander-ziegler-simonsen/my-queuehandler

echo "done...."