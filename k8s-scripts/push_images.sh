
echo "pushing all the docker images to minikube.."

minikube image load my-api
minikube image load my-queuehandler
minikube image load my-seeder

# minikube image load my-mongo
# minikube image load my-rabbitmq
# minikube image load my-postgres

echo "done...."