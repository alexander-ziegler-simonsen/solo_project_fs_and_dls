echo "restarting deployments to apply updated images... "
kubectl rollout restart deployment

echo "done restarting..."