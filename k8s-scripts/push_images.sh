
echo "pushing all the docker images to minikube.."

minikube image load my-seeder
minikube image load my-client
minikube image load my-api
minikube image load my-queuehandler

echo "done...."