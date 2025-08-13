echo "we will now start deleting all pods on k8s...."

echo "print all pods first..."

kubectl get nodes

# kubectl drain <nodename>

kubectl delete -n ors deployment postgres-svc
kubectl delete -n ors deployment mongo-svc
kubectl delete -n ors deployment seeder-job
kubectl delete -n ors deployment rabbitmq-svc
kubectl delete -n ors deployment api-svc
kubectl delete -n ors deployment queue-handler-svc

echo "all nodes should be deleted..."