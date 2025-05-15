echo "deleting all persistent data from k8s volumes..."

kubectl delete pvc mongodata
kubectl delete pvc postgresdata
kubectl delete pvc rabbitmqdata

echo "done deleting all persistent data from k8s..."