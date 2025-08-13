echo "deleting all persistent data from k8s volumes..."

kubectl delete pvc -n ors postgres-svc
kubectl delete pvc -n ors mongo-svc
kubectl delete pvc -n ors seeder-svc
kubectl delete pvc -n ors rabbitmq-svc
kubectl delete pvc -n ors api-svc
kubectl delete pvc -n ors queue-handler-svc

echo "done deleting all persistent data from k8s..."