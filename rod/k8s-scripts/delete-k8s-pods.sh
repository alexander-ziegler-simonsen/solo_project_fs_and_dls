echo "we will now start deleting all pods on k8s...."

echo "print all pods first..."

kubectl get nodes

# kubectl drain <nodename>

kubectl delete -n default deployment service-postgres
kubectl delete -n default deployment service-mongo
kubectl delete -n default deployment service-seeder
kubectl delete -n default deployment service-rabbitmq
kubectl delete -n default deployment service-client
kubectl delete -n default deployment service-api
kubectl delete -n default deployment service-ms-queuehandler

echo "all nodes should be deleted..."