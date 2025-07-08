echo "deleting all persistent data from k8s volumes..."

kubectl delete pvc service-postgres
kubectl delete pvc service-mongo
kubectl delete pvc service-seeder
kubectl delete pvc service-rabbitmq
kubectl delete pvc service-client
kubectl delete pvc service-api
kubectl delete pvc service-ms-queuehandler

echo "done deleting all persistent data from k8s..."